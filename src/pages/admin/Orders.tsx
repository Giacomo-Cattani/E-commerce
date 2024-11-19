import React, { useState, useEffect } from 'react';

interface OrdersProps {
    theme: string;
}

interface Order {
    id: number;
    customerName: string;
    totalAmount: number;
    status: string;
}

export const Orders: React.FC<OrdersProps> = ({ theme }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Fetch orders from API
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        // Replace with actual API call
        const fetchedOrders: Order[] = [
            { id: 1, customerName: 'John Doe', totalAmount: 100, status: 'Pending' },
            { id: 2, customerName: 'Jane Smith', totalAmount: 200, status: 'Shipped' },
        ];
        setOrders(fetchedOrders);
    };

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen pt-32`}>
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-center mb-12">Order Management</h1>
                <div className="mb-4 text-center">
                    <button onClick={fetchOrders} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                        Refresh Orders
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full  rounded-xl shadow-lg overflow-hidden">
                        <thead className={`${isDarkTheme ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                            <tr>
                                <th className="py-2 px-4">Order ID</th>
                                <th className="py-2 px-4">Customer Name</th>
                                <th className="py-2 px-4">Total Amount</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b">
                                    <td className="py-2 px-4">{order.id}</td>
                                    <td className="py-2 px-4">{order.customerName}</td>
                                    <td className="py-2 px-4">${order.totalAmount}</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
