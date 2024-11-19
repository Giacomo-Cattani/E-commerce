
import React from 'react';

interface HeroSectionProps {
    theme: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`relative bg-gradient-to-r ${isDarkTheme ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} pt-32 pb-20 px-6`}>
            <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
                <div>
                    <h1 className="text-5xl font-bold mb-6 ">
                        Discover Amazing Products
                    </h1>
                    <p className="text-xl mb-8">
                        Find the latest trends, unbeatable deals, and high-quality products across multiple categories.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            className="px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition transform hover:scale-105"
                        >
                            Shop Now
                        </button>
                        <button
                            className="px-8 py-3 border-2 border-yellow-500 text-yellow-600 rounded-full hover:bg-yellow-100 transition transform hover:scale-105"
                        >
                            View Categories
                        </button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Shopping Illustration"
                        className="w-full rounded-xl shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
};