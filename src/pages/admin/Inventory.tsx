import React from 'react';

interface InventoryProps {
    theme: string;
}

export const Inventory: React.FC<InventoryProps> = ({ theme }) => {
    return (
        <div className="pt-32">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <div className="mt-4">
                {/* Add inventory management functionality here */}
            </div>
        </div>
    );
};
