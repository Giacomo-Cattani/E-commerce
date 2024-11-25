
import React from 'react';
import { IconTruck, IconShield, IconHeart } from '@tabler/icons-react';

interface BenefitsSectionProps {
    theme: string;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
            <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
                <div className={`transform hover:-translate-y-2 transition-all duration-300 bg-white p-6 rounded-xl shadow-md hover:shadow-lg  ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                    <IconTruck className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h3 className="text-xl font-semibold mb-2 text-neutral-800">Free Shipping</h3>
                    <p className="text-neutral-400">Free shipping on orders over $100</p>
                </div>
                <div className={`transform hover:-translate-y-2 transition-all duration-300 bg-white p-6 rounded-xl shadow-md hover:shadow-lg  ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                    <IconShield className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h3 className={`text-xl font-semibold mb-2 text-neutral-800`}>Secure Payment</h3>
                    <p className="text-neutral-400">100% secure payment methods</p>
                </div>
                <div className={`transform hover:-translate-y-2 transition-all duration-300 bg-white p-6 rounded-xl shadow-md hover:shadow-lg  ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                    <IconHeart className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h3 className="text-xl font-semibold mb-2 text-neutral-800">24/7 Support</h3>
                    <p className="text-neutral-400">Dedicated customer support</p>
                </div>
            </div>
        </section>
    );
};