import React from 'react';

interface StatsSectionProps {
    theme: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-24 px-6 ${isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Dashboard Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className={` rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">Total Sales</h3>
                        <p className="text-4xl">$12,345</p>
                    </div>
                    <div className={` rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">New Customers</h3>
                        <p className="text-4xl">123</p>
                    </div>
                    <div className={`rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">Pending Orders</h3>
                        <p className="text-4xl">45</p>
                    </div>
                </div>
            </div>
        </section>
    );
};