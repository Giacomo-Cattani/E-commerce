import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Star } from 'lucide-react';
import { database } from '../../appwrite';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';

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
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [order, setOrder] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setHasMore(true);
        fetchProducts();
    }, [page, search, type, order]);


    useEffect(() => {
        sessionStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        sessionStorage.setItem('page', JSON.stringify(page));
    }, [page]);

    const fetchProducts = async () => {
        const products = await database.listDocuments(
            '672ca0ab0036c24b4884',
            '6732370600354fdb69a3',
            [
                Query.contains('category', type),
                Query.contains('name', search),
                Query.contains('description', search),
                Query.limit(25),
                Query.offset(page * 25),
            ]
        );
        if (products.documents.length === 0) {
            setHasMore(false);
        } else {
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

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products'); // Reset session storage when type changes
        sessionStorage.removeItem('page'); // Reset session storage when type changes
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value);
        setPage(0);
        setProducts([]);
        sessionStorage.removeItem('products'); // Reset session storage when order changes
        sessionStorage.removeItem('page'); // Reset session storage when order changes
    };

    const handleAddProduct = () => {
        // Add product logic here
    };

    const handleDeleteProduct = (id: string) => {
        // Delete product logic here
    };

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
        <div className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen p-6`}>
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    className={`border p-3 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'}`}
                />
                <select value={type} onChange={handleTypeChange} className={`border p-3 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                    <option value="">All Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="sports">Sports</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                </select>
                {/* <select value={order} onChange={handleOrderChange} className={`border p-3 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                    <option value="">Order by</option>
                    <option value="priceAsc">Price Ascending</option>
                    <option value="priceDesc">Price Descending</option>
                </select> */}
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
                                <h3 className="text-xl font-semibold mb-2 text-neutral-800">{product.name}</h3>
                                <div className="flex items-center mt-auto mb-2">
                                    <Star className="text-yellow-500 mr-2" size={20} />
                                    <span className='text-neutral-800'>{product.rating} ({product.reviews_count} reviews)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-neutral-800">${product.price}</span>
                                    <button
                                        onClick={() => handleDeleteProduct(product.$id)}
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
        </div>
    );
};
