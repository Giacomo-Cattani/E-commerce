import React from 'react';

interface UserManagementProps {
    theme: string;
}

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer' }
];

export const UserManagement: React.FC<UserManagementProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">User Management</h2>
                <div className="overflow-x-auto">
                    <table className={`min-w-full  ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">User ID</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.id}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};