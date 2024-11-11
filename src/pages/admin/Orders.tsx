import React from 'react';

interface OrdersProps {
    theme: string;
}

export const Orders: React.FC<OrdersProps> = ({ theme }) => {
    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Order Management</h1>
            <div className="mt-4">
                {/* Add order management functionality here */}
            </div>
        </div>
    );
};
