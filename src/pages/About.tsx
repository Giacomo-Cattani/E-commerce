
import React from 'react';

export const About: React.FC<{ theme: string }> = ({ theme }) => {
    return (
        <div className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} py-20 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} min-h-screen p-6`}>
            <h1>About Us</h1>
            {/* Add your about page content here */}
        </div>
    );
};