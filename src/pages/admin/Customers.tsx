import React, { useState } from 'react';

interface CustomersProps {
    theme: string;
}

export const Customers: React.FC<CustomersProps> = ({ theme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState('');

    const customers = [
        { name: 'John Doe', email: 'john@example.com', phone: '+1 123-456-7890', status: 'Active', registrationDate: '01-Jan-2024' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987-654-3210', status: 'Inactive', registrationDate: '15-Feb-2024' },
        // Add more customers as needed
    ];

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`min-h-screen h-full pt-32 px-6 ${isDarkTheme ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white' : 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-neutral-900'}`}>
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded shadow ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}>
                        <h2 className="text-xl font-semibold">Total Customers</h2>
                        <p className="text-2xl">250</p>
                    </div>
                    <div className={`p-4 rounded shadow ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}>
                        <h2 className="text-xl font-semibold">New This Month</h2>
                        <p className="text-2xl">20</p>
                    </div>
                </div>
                <div className="mt-4 flex space-x-4">
                    <button className="px-4 py-2 bg-green-500 text-white rounded">Export Data</button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-8 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search by Name, Email, or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`flex-grow px-4 py-2 border rounded ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`px-4 py-2 border rounded ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}
                >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <input
                    type="date"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className={`px-4 py-2 border rounded ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}
                />
            </div>

            {/* Customer Table */}
            <div className={`p-4 rounded shadow ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900'}`}>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Registration Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{customer.name}</td>
                                <td className="px-4 py-2">{customer.email}</td>
                                <td className="px-4 py-2">{customer.phone}</td>
                                <td className="px-4 py-2">{customer.status}</td>
                                <td className="px-4 py-2">{customer.registrationDate}</td>
                                <td className="px-4 py-2">
                                    <button className="px-2 py-1 bg-blue-500 text-white rounded">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
