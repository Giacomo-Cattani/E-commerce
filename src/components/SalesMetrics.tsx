
import React from 'react';

interface SalesMetricsProps {
    theme: string;
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-24 px-6 `}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Sales and Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className={`rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">Total Revenue</h3>
                        <p className="text-4xl">$45,678</p>
                    </div>
                    <div className={`rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">Total Orders</h3>
                        <p className="text-4xl">123</p>
                    </div>
                    <div className={`rounded-xl shadow-md p-6 text-center ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <h3 className="text-2xl font-bold mb-4">Key Trends</h3>
                        <p className="text-xl">Upward trend in sales</p>
                    </div>
                </div>
            </div>
        </section>
    );
};