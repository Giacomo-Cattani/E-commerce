import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IconMoon, IconSun, IconFlame } from '@tabler/icons-react';
import { IconUserCircle, IconShoppingCart, IconLogin, IconLogout, IconShield } from '@tabler/icons-react';
import { useAuth } from '../context';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(false);
    const { isLoggedIn, logout, admin } = useAuth();
    const [showCart, setShowCart] = useState(false);
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname]);

    const handleNavigation = (path: string) => {
        navigate(path);
        setCurrentPage(path);
    };

    const renderRows = () => {
        const rows = [];
        for (let i = 1; i <= 100; i++) {
            rows.push(
                <li key={i} className="p-2 bg-white dark:bg-neutral-700 rounded shadow">
                    Row {i}
                </li>
            );
        }
        return rows;
    };


    return (
        <div className="grid grid-cols">
            <div className={`col-span-${showCart ? '8' : '9'}`}>
                <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50`}>
                    <nav className="flex justify-between items-center">
                        <div onClick={() => handleNavigation('/')} className="text-2xl font-bold text-gold cursor-pointer">
                            Nex Gen Market
                        </div>
                        <ul className="flex space-x-6 items-center">
                            <li className="relative group">
                                <div onClick={() => handleNavigation('/catalog')} className={`cursor-pointer ${currentPage === '/catalog' ? 'underline underline-offset-4' : ''} transition-transform duration-300 group-hover:scale-110 hover:font-bold`}>
                                    <span className="absolute top-0 -left-1 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className='mt-5'>
                                            <defs>
                                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: 'red', stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
                                                </linearGradient>
                                            </defs>
                                            <IconFlame size={18} className='-rotate-12' color='url(#grad1)' fill='url(#grad1)' />
                                        </svg>
                                        <span className="text-xs text-red-500 transform -rotate-12">New</span>
                                    </span>
                                    Catalog
                                </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigation('/products')} className={`cursor-pointer ${currentPage === '/products' ? 'underline underline-offset-4' : ''} transition-transform duration-300 group-hover:scale-110 hover:font-bold`}>
                                    Products
                                </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigation('/about')} className={`cursor-pointer ${currentPage === '/about' ? 'underline underline-offset-4' : ''} transition-transform duration-300 group-hover:scale-110 hover:font-bold`}>
                                    About
                                </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigation('/contact')} className={`cursor-pointer ${currentPage === '/contact' ? 'underline underline-offset-4' : ''} transition-transform duration-300 group-hover:scale-110 hover:font-bold`}>
                                    Contact
                                </div>
                            </li>
                        </ul>
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <div onClick={() => setShowCart(!showCart)} className="mr-2 cursor-pointer flex flex-col items-center relative group"></div>
                                <div onClick={() => setShowCart(!showCart)} className="mr-2 cursor-pointer flex flex-col items-center relative group">
                                    <IconShoppingCart stroke={1.2} color={`${theme === 'dark' ? 'white' : 'black'}`} />
                                    <div className="absolute bottom-0 translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Cart
                                    </div>
                                </div>
                            </li>
                            <li style={{ marginLeft: '10px' }}>
                                <div onClick={() => handleNavigation('/profile')} className="mr-2 cursor-pointer flex flex-col items-center relative group">
                                    <IconUserCircle stroke={1.2} color={`${theme === 'dark' ? 'white' : 'black'}`} />
                                    <div className="absolute bottom-0 translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Profile
                                    </div>
                                </div>
                            </li>
                            {admin && (
                                <li style={{ marginLeft: '10px' }}>
                                    <div onClick={() => handleNavigation('/admin')} className="mr-2 cursor-pointer flex flex-col items-center relative group">
                                        <IconShield stroke={1.2} color={`${theme === 'dark' ? 'white' : 'black'}`} />
                                        <div className="absolute bottom-0 translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Admin
                                        </div>
                                    </div>
                                </li>
                            )}
                            <li style={{ marginLeft: '10px' }}>
                                <div
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    onClick={() => {
                                        if (!isLoggedIn) {
                                            handleNavigation('/login');
                                        } else {
                                            logout();
                                            handleNavigation('/login');
                                        }
                                    }} className="mr-2 cursor-pointer flex flex-col items-center relative group">
                                    {!isLoggedIn ? (
                                        <>
                                            <IconLogin
                                                stroke={1.2}
                                                color={`${hovered ? 'lime' : theme === 'dark' ? 'white' : 'black'}`}
                                            />
                                            <div className="absolute bottom-0 translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Login
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <IconLogout
                                                stroke={1.2}
                                                color={`${hovered ? 'red' : theme === 'dark' ? 'white' : 'black'}`}
                                                className="hover:text-red-500"
                                            />
                                            <div className="absolute bottom-0 translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Logout
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                            <li>
                                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                    {theme === 'dark' ? <IconSun className="text-yellow-500" size={20} /> : <IconMoon className="text-neutral-500" size={20} />}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Outlet />

            </div>
            {showCart ? <div className="col-span-1 h-screen overflow-y-scroll fixed right-0 top-16 scrollbar-hide">
                <ul className=" space-y-4 p-4">
                    {renderRows()}
                </ul>
            </div> : null}
        </div>
    );
};
