import React, { useState } from 'react';

interface InventoryProps {
    theme: string;
}

interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export const Inventory: React.FC<InventoryProps> = ({ theme }) => {
    const [items, setItems] = useState<InventoryItem[]>([
        { id: 1, name: 'Item 1', quantity: 10, price: 100 },
        { id: 2, name: 'Item 2', quantity: 5, price: 200 },
    ]);

    const addItem = () => {
        const newItem: InventoryItem = {
            id: items.length + 1,
            name: `Item ${items.length + 1}`,
            quantity: 0,
            price: 0,
        };
        setItems([...items, newItem]);
    };

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen pt-32`}>
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-center mb-12">Inventory Management</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-xl shadow-md overflow-hidden">
                        <thead className={`${isDarkTheme ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-2 px-4">{item.id}</td>
                                    <td className="py-2 px-4">{item.name}</td>
                                    <td className="py-2 px-4">{item.quantity}</td>
                                    <td className="py-2 px-4">${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={addItem} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    Add Item
                </button>
            </div>
        </div>
    );
};
