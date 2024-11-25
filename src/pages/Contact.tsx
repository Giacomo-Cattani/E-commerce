import React from 'react';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

interface ContactProps {
    theme: string;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    return (
        <div className={`bg-gradient-to-r ${isDarkTheme ? 'from-gray-900 to-gray-800' : 'from-yellow-50 to-yellow-100'} min-h-screen`}>
            {/* Hero Section */}
            <section className="relative pt-36 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-purple-500 animate-gradient" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            Get in Touch
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-8">
                            We'd love to hear from you! Reach out to us with any questions or feedback.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        <div className={`rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                            <IconMail className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                            <h3 className="text-3xl font-bold mb-2">Email Us</h3>
                            <p className="md:text-base text-lg opacity-75">contact@ecommerce.com</p>
                        </div>
                        <div className={`rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                            <IconPhone className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                            <h3 className="text-3xl font-bold mb-2">Call Us</h3>
                            <p className="text-lg opacity-75">+1 234 567 890</p>
                        </div>
                        <div className={`rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                            <IconMapPin className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                            <h3 className="text-3xl font-bold mb-2">Visit Us</h3>
                            <p className="text-lg opacity-75">123 E-commerce St, Shopsville</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Contact Form Section */}
            < section className="py-16 px-4" >
                <div className="container mx-auto max-w-4xl">
                    <div className={`rounded-2xl p-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                        <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
                                <input className="w-full p-3 rounded-lg border border-gray-300" type="text" id="name" name="name" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
                                <input className="w-full p-3 rounded-lg border border-gray-300" type="email" id="email" name="email" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="message">Message</label>
                                <textarea className="w-full p-3 rounded-lg border border-gray-300" id="message" name="message" rows={5}></textarea>
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Contact;