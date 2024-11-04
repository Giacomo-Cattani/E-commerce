import React, { useState } from 'react';
import { Heart, Star, Truck, Shield } from 'lucide-react';

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

const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home & Kitchen', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Books', icon: '📚' }
];

export const Home: React.FC<HomeProps> = ({ theme }) => {
    const [cartItems, setCartItems] = useState(0);

    const addToCart = () => {
        setCartItems(cartItems + 1);
    };

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`${isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} min-h-screen`}>
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-r ${isDarkTheme ? 'from-gray-800 to-gray-700' : 'from-yellow-50 to-yellow-100'} pt-32 pb-20 px-6`}>
                <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
                    <div>
                        <h1 className="text-5xl font-bold mb-6">
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

            {/* Benefits Section */}
            <section className={`py-16 px-6 ${isDarkTheme ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <Truck className="mx-auto mb-4 text-yellow-500" size={48} />
                        <h3 className="text-xl font-semibold mb-2 text-neutral-800">Free Shipping</h3>
                        <p className="text-neutral-400">Free shipping on orders over $100</p>
                    </div>
                    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <Shield className="mx-auto mb-4 text-yellow-500" size={48} />
                        <h3 className={`text-xl font-semibold mb-2 text-neutral-800`}>Secure Payment</h3>
                        <p className="text-neutral-400">100% secure payment methods</p>
                    </div>
                    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}>
                        <Heart className="mx-auto mb-4 text-yellow-500" size={48} />
                        <h3 className="text-xl font-semibold mb-2 text-neutral-800">24/7 Support</h3>
                        <p className="text-neutral-400">Dedicated customer support</p>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:scale-105 transition cursor-pointer ${isDarkTheme ? 'bg-neutral-700 text-white' : ''}`}
                            >
                                <div className="text-5xl mb-4">{category.icon}</div>
                                <p className="font-semibold">{category.name}</p>
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
                                    <button
                                        className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-yellow-50 transition"
                                        onClick={() => {/* Add to wishlist */ }}
                                    >
                                        <Heart className="text-neutral-500 hover:text-red-500" />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                    <div className="flex items-center mt-auto mb-2">
                                        <Star className="text-yellow-500 mr-2" size={20} />
                                        <span>{product.rating} ({product.reviews} reviews)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold">${product.price}</span>
                                        <button
                                            onClick={addToCart}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
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

            {/* Newsletter */}
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
                        <button onClick={() => { alert("GAYY") }}
                            className="px-8 py-3 bg-neutral-900 text-white rounded-r-full hover:bg-neutral-800 transition"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
