import React, { useState } from 'react';
import { database } from '../appwrite';
import { ID } from 'appwrite';
import { ToastContainer, toast } from 'react-toastify';

enum Category {
    Electronics = 'Electronics',
    Fashion = 'Fashion',
    HomeKitchen = 'Home & Kitchen',
    Sports = 'Sports',
    Beauty = 'Beauty',
    Books = 'Books'
}

interface CreateProductProps {
    closePopup: () => void;
}

export const CreateProduct: React.FC<CreateProductProps> = ({ closePopup }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>(Category.Electronics);
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await database.createDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_COL_PRODUCT,
                ID.unique(),
                {
                    name: name,
                    category: category,
                    price: parseFloat(price),
                    image: image ? image : `https://placehold.co/400x300?text=${name}`,
                    stock: parseInt(stock, 10),
                    description: description,
                }
            );
            closePopup();
            toast.success('Product created successfully');
        } catch (error) {
            toast.error('Failed to create product');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-16">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price *</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category *</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    >
                        {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Stock *</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700"
                        required
                    />
                </div>
                <div className="mb-2 text-red-500 text-sm">
                    Fields marked with * are mandatory.
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Add Product
                </button>
            </form>
            <ToastContainer className="mt-20 z-50" />
        </div>
    );
};