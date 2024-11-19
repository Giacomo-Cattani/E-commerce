import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Star, ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import { database } from '../../appwrite';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateProduct } from '../../components/CreateProduct';

interface Product {
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    reviews_count: number;
    stock: number;
    description: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    reviews: any[];
    $databaseId: string;
    $collectionId: string;
}

export const Products: React.FC<{ theme: string }> = ({ theme }) => {
    const [products, setProducts] = useState<Product[]>(() => {
        const savedProducts = sessionStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem('page');
        return savedPage ? JSON.parse(savedPage) : 0;
    });
    const [search, setSearch] = useState(() => {
        const savedSearch = sessionStorage.getItem('search');
        return savedSearch ? JSON.parse(savedSearch) : '';
    });
    const [type, setType] = useState<string[]>(() => {
        const savedType = sessionStorage.getItem('type');
        return savedType ? JSON.parse(savedType) : [];
    });
    const [order, setOrder] = useState(() => {
        const savedOrder = sessionStorage.getItem('order');
        return savedOrder ? JSON.parse(savedOrder) : 'Name';
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [showOrderDropdown, setShowOrderDropdown] = useState(false);
    const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const orderDropdownRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const { categories } = useAuth();

    useEffect(() => {
        setHasMore(true);
        fetchProducts();
    }, [page, search, type, orderType, order]);

    useEffect(() => {
        sessionStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        sessionStorage.setItem('page', JSON.stringify(page));
    }, [page]);

    useEffect(() => {
        sessionStorage.setItem('search', JSON.stringify(search));
    }, [search]);

    useEffect(() => {
        sessionStorage.setItem('type', JSON.stringify(type));
    }, [type]);

    useEffect(() => {
        sessionStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
            if (orderDropdownRef.current && !orderDropdownRef.current.contains(event.target as Node)) {
                setShowOrderDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutsidePopup = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            handleClosePopup();
        }
    };

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('mousedown', handleClickOutsidePopup);
        } else {
            document.removeEventListener('mousedown', handleClickOutsidePopup);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePopup);
        };
    }, [isPopupOpen]);

    const fetchProducts = async () => {
        const products = await database.listDocuments(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_COL_PRODUCT,
            [
                ...(type.length > 1 ? [Query.or(type.map(t => Query.contains('category', t)))] : type.map(t => Query.contains('category', t))),
                Query.or(
                    [Query.contains('name', search),
                    Query.contains('description', search)
                    ]),
                Query.limit(25),
                Query.offset(page * 25),
                orderType === 'asc' ? Query.orderAsc(order.toLowerCase()) : Query.orderDesc(order.toLowerCase())
            ]
        );
        if (products.documents.length === 0) {
            setHasMore(false);
        } else {
            if (products.documents.length < 25) {
                setHasMore(false);
            }
            setProducts(prevProducts => {
                const newProducts = (products.documents as Product[]).filter((newProduct: Product) =>
                    !prevProducts.some(prevProduct => prevProduct.$id === newProduct.$id)
                );
                return [...prevProducts, ...newProducts];
            });
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products'); // Reset session storage when search changes
        sessionStorage.removeItem('page'); // Reset session storage when search changes
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setType(prevType =>
            prevType.includes(value)
                ? prevType.filter(t => t !== value)
                : [...prevType, value]
        );
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products'); // Reset session storage when type changes
        sessionStorage.removeItem('page'); // Reset session storage when type changes
    };

    const handleOrderClick = (orderBy: string) => {
        setOrder(orderBy.charAt(0).toUpperCase() + orderBy.slice(1));
        setOrderType(prevOrderType => prevOrderType === 'asc' ? 'desc' : 'asc');
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products'); // Reset session storage when order changes
        sessionStorage.removeItem('page'); // Reset session storage when order changes
    };

    const handleAddProduct = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleDeleteProduct = (id: string) => {
        setProductToDelete(id);
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            const deleteProduct = await database.deleteDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_COL_PRODUCT,
                productToDelete
            );
            if (deleteProduct) {
                setProducts(prevProducts => prevProducts.filter(product => product.$id !== productToDelete));
                toast.success('Product deleted successfully');
            }
        } catch (error) {
            toast.error('Error deleting product');
        } finally {
            setProductToDelete(null);
        }
    };

    const handleResetFilters = () => {
        setSearch('');
        setType([]);
        setOrder('Name');
        setOrderType('asc');
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products');
        sessionStorage.removeItem('page');
        sessionStorage.removeItem('search');
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('order');
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const SkeletonCard: React.FC = () => (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col animate-pulse">
            <div className="w-full h-64 bg-neutral-300"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 bg-neutral-300 mb-2"></div>
                <div className="h-4 bg-neutral-300 mb-2"></div>
                <div className="h-4 bg-neutral-300 mb-2"></div>
                <div className="mt-auto flex justify-between items-center">
                    <div className="h-8 w-24 bg-neutral-300"></div>
                    <div className="h-8 w-16 bg-neutral-300"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} py-20 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen p-6`}>

            <div className="mb-8 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    className={`border p-3 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-neutral-900 border-neutral-300'}`}
                />
                <div className="relative" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder="Select categories..."
                        value={type.join(', ').replace(/^, /, '')}
                        readOnly
                        className={`border p-3 rounded-md cursor-pointer ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-neutral-900 border-neutral-300'}`}
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className={`absolute mt-1 w-full border rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-neutral-900 border-neutral-300'}`}>
                            {categories.map((category: { name: string; icon: string }) => (
                                <label key={category.name} className="block p-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={category.name}
                                        checked={type.includes(category.name)}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative" ref={orderDropdownRef}>
                    <div
                        className={`border p-3 rounded-md cursor-pointer flex items-center ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-neutral-900 border-neutral-300'}`}
                        onClick={() => setShowOrderDropdown(!showOrderDropdown)}
                    >
                        <span>{order}</span>
                        {order && (
                            orderType === 'asc' ? <ArrowDownNarrowWide className="inline ml-2" /> : <ArrowUpNarrowWide className="inline ml-2" />
                        )}
                    </div>
                    {showOrderDropdown && (
                        <div className={`absolute mt-1 w-full border rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-neutral-900 border-neutral-300'}`}>
                            {['Name', 'Rating', 'Price'].map(orderBy => (
                                <div key={orderBy} className="flex justify-between items-center p-2 cursor-pointer" onClick={() => handleOrderClick(orderBy.toLowerCase())}>
                                    {orderBy}
                                    {order.toLowerCase() === orderBy.toLowerCase() && (
                                        orderType === 'asc' ? <ArrowDownNarrowWide className="inline ml-2" /> : <ArrowUpNarrowWide className="inline ml-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleResetFilters} className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Remove All Filters</button>
                <button onClick={handleAddProduct} className="p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Add Product</button>
            </div>
            <InfiniteScroll
                dataLength={products.length}
                next={() => setPage((prev: number) => prev + 1)}
                hasMore={hasMore}
                loader={null} // Remove loader from here
            >
                <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
                    {products.map(product => (
                        <div
                            key={product.$id}
                            onClick={() => navigate(`${product.$id}`)}
                            className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col cursor-pointer ${theme === 'dark' ? 'bg-neutral-700 text-white' : ''}`}
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className={`text-xl font-semibold mb-2 text-neutral-800`}>{product.name}</h3>
                                <div className="flex items-center mt-auto mb-2">
                                    <Star className="text-yellow-500 mr-2" size={20} />
                                    <span className={`text-neutral-800`}>{product.rating} ({product.reviews_count} reviews)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`text-2xl font-bold text-neutral-800`}>${product.price}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.$id); }}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {hasMore && (
                        <>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </>
                    )}
                </div>
            </InfiniteScroll>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div ref={popupRef} className="relative rounded-lg shadow-md w-96 mx-auto">
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <CreateProduct closePopup={closePopup} />
                    </div>
                </div>
            )}
            {productToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-md text-neutral-800">
                        <h2 className="text-xl mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={() => setProductToDelete(null)} className="px-4 py-2 bg-gray-900 rounded-md text-white">Cancel</button>
                            <button onClick={confirmDeleteProduct} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
