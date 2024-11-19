
import React from 'react';

interface NewsletterSectionProps {
    theme: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-16 px-6 bg-gradient-to-r ${isDarkTheme ? 'from-gray-800 to-gray-700' : 'from-yellow-500 to-yellow-600'} text-white`}>
            <div className="container mx-auto text-center max-w-2xl">
                <h2 className="text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                <p className="text-xl mb-8">
                    Get exclusive deals, product updates, and 10% off your first order!
                </p>
                <div className="flex max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-grow px-6 py-3 rounded-l-full text-neutral-900 focus:outline-none"
                    />
                    <button
                        className="px-8 py-3 bg-neutral-900 text-white rounded-r-full hover:bg-neutral-800 transition"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};