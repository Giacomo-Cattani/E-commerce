import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Products: React.FC<{ theme: string }> = ({ theme }) => {
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [order, setOrder] = useState('');

    // useEffect(() => {
    //     fetchProducts();
    // }, [page, search, type, order]);

    // const fetchProducts = async () => {
    //     const response = await axios.get(`/api/products`, {
    //         params: { page, search, type, order }
    //     });
    //     if (response.data.length === 0) {
    //         setHasMore(false);
    //     } else {
    //         setProducts(prevProducts => [...prevProducts, ...response.data]);
    //     }
    // };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
        setProducts([]);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        setPage(1);
        setProducts([]);
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value);
        setPage(1);
        setProducts([]);
    };

    const handleAddProduct = () => {
        // Add product logic here
    };

    const handleDeleteProduct = (id: number) => {
        // Delete product logic here
    };

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
                    <option value="">All Types</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                </select>
                <select value={order} onChange={handleOrderChange} className={`border p-3 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                    <option value="">Order by</option>
                    <option value="priceAsc">Price Ascending</option>
                    <option value="priceDesc">Price Descending</option>
                </select>
                <button onClick={handleAddProduct} className="p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Add Product</button>
            </div>
            <InfiniteScroll
                dataLength={products.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={<h4 className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Loading...</h4>}
            >
                <div className="grid md:grid-cols-3 gap-8">
                    {/* {products.map(product => (
                        <div key={product.id} className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col ${theme === 'dark' ? 'bg-neutral-700 text-white' : ''}`}>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold mb-2 text-neutral-800">{product.name}</h2>
                                <p className="text-neutral-400 mb-4">{product.description}</p>
                                <p className="text-2xl font-bold text-neutral-800 mb-4">${product.price}</p>
                                <button onClick={() => handleDeleteProduct(product.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">Delete</button>
                            </div>
                        </div>
                    ))} */}
                </div>
            </InfiniteScroll>
        </div>
    );
};
