import React, { useState } from 'react';
import { IconStar } from '@tabler/icons-react';
import { useAuth } from '../context';
import { HeroSection, BenefitsSection, NewsletterSection } from '../components';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    theme: string;
}

// Sample product data (would typically come from backend/API)
const featuredProducts = [
    {
        id: 1,
        name: 'Wireless Noise-Cancelling Headphones',
        category: 'Electronics',
        price: 249.99,
        image: 'https://placehold.co/400x300',
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: 'Minimalist Leather Backpack',
        category: 'Fashion',
        price: 129.99,
        image: 'https://placehold.co/400x300',
        rating: 4.7,
        reviews: 92
    },
    {
        id: 3,
        name: 'Smart Fitness Watch',
        category: 'Sports',
        price: 199.99,
        image: 'https://placehold.co/400x300',
        rating: 4.6,
        reviews: 215
    }
];

export const Home: React.FC<HomeProps> = ({ theme }) => {
    const [cartItems, setCartItems] = useState(0);
    const { categories } = useAuth();
    const navigate = useNavigate();

    const addToCart = () => {
        setCartItems(cartItems + 1);
    };

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen`}>
            <HeroSection theme={theme} />
            <BenefitsSection theme={theme} />
            {/* Product Categories */}
            <section className="py-16 px-6" id='categories-section'>
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <div
                                onClick={() => {
                                    navigate(`/products?category=${category.name}`);
                                    window.scrollTo(0, 0);
                                }}
                                key={index}
                                className={`bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:scale-105 transition cursor-pointer ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}
                            >
                                <div className="text-5xl mb-4">{category.icon}</div>
                                <p className="font-semibold text-neutral-800">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Featured Products */}
            <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <div
                                key={product.id}
                                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2 text-neutral-800">{product.name}</h3>
                                    <div className="flex items-center mt-auto mb-2">
                                        <IconStar className="text-yellow-500 mr-2" size={20} />
                                        <span className='text-neutral-800' >{product.rating} ({product.reviews} reviews)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-neutral-800">${product.price}</span>
                                        <button
                                            onClick={addToCart}
                                            className="md:text-xs lg:text-base px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <NewsletterSection theme={theme} />
        </div>
    );
};
