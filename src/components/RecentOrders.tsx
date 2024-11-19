import React from 'react';

interface RecentOrdersProps {
    theme: string;
}

const orders = [
    { id: 1, customer: 'John Doe', total: '$99.99', status: 'Shipped' },
    { id: 2, customer: 'Jane Smith', total: '$149.99', status: 'Processing' },
    { id: 3, customer: 'Bob Johnson', total: '$79.99', status: 'Delivered' }
];

export const RecentOrders: React.FC<RecentOrdersProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}`}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className={`min-w-full  ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Order ID</th>
                                <th className="py-2 px-4 border-b">Customer</th>
                                <th className="py-2 px-4 border-b">Total</th>
                                <th className="py-2 px-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="py-2 px-4 border-b">{order.id}</td>
                                    <td className="py-2 px-4 border-b">{order.customer}</td>
                                    <td className="py-2 px-4 border-b">{order.total}</td>
                                    <td className="py-2 px-4 border-b">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};