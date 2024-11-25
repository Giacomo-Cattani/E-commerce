import React from 'react';
import { IconStar, IconUsers, IconShieldCheck, IconMail } from '@tabler/icons-react';

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`rounded-lg shadow-lg ${className}`}>
        {children}
    </div>
);

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

interface AboutProps {
    theme: string;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
    const isDarkTheme = theme === 'dark';

    const stats = [
        { icon: IconUsers, label: 'Happy Customers', value: '50k+' },
        { icon: IconStar, label: 'Reviews', value: '4.9/5' },
        { icon: IconShieldCheck, label: 'Secure Transactions', value: '100%' },
    ];

    return (
        <div className={`bg-gradient-to-r ${isDarkTheme ? 'from-gray-900 to-gray-800' : 'from-yellow-50 to-yellow-100'} min-h-screen`}>
            {/* Hero Section */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient`} />
                </div>

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            Revolutionizing
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"> Online Shopping </span>
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-8">
                            Creating exceptional shopping experiences through innovation and dedication
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className={`transform hover:-translate-y-2 transition-all duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                                <CardContent className="p-6 text-center">
                                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                                    <p className="text-lg opacity-75">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className={`rounded-2xl p-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                        <div className="space-y-6 text-lg leading-relaxed">
                            <p>
                                Welcome to our e-commerce platform! We are dedicated to providing you with the best online shopping experience through innovative technology and exceptional service.
                            </p>
                            <p>
                                Our mission is to revolutionize online shopping by offering high-quality products at competitive prices, backed by unmatched customer service. We leverage cutting-edge technology to make your shopping journey seamless and enjoyable.
                            </p>
                            <p>
                                Our passionate team carefully curates a diverse range of products to cater to every need and preference. From the latest electronics to trendy fashion, sports equipment to home essentials, we're your one-stop destination.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <div className="flex justify-center space-x-4">
                        <button className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                            <IconMail className="w-5 h-5 group-hover:animate-bounce" />
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;