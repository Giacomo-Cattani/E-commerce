import React from 'react';

interface InventoryManagementProps {
    theme: string;
}

const products = [
    { id: 1, name: 'Wireless Noise-Cancelling Headphones', stock: 20 },
    { id: 2, name: 'Minimalist Leather Backpack', stock: 15 },
    { id: 3, name: 'Smart Fitness Watch', stock: 10 }
];

export const InventoryManagement: React.FC<InventoryManagementProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Inventory Management</h2>
                <div className="overflow-x-auto">
                    <table className={`min-w-full ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Product ID</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4 border-b">{product.id}</td>
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
