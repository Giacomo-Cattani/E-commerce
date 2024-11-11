import React from 'react';

interface CustomersProps {
    theme: string;
}

export const Customers: React.FC<CustomersProps> = ({ theme }) => {
    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <div className="mt-4">
                {/* Add customer management functionality here */}
            </div>
        </div>
    );
};
