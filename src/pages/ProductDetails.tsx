
import React from 'react';

export const ProductDetails: React.FC<{ theme: string }> = ({ theme }) => {
    return (
        <div className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} py-20 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen p-6`}>
            <h1>Product Details Page</h1>
            {/* Add your product details code here */}
        </div>
    );
};