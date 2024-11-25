import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { IconUserCircle, IconShoppingCart, IconLogin, IconLogout, IconShield } from '@tabler/icons-react';
import { useAuth } from '../context';
import { CartPopUp } from './CartPopUp';

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

    return (
        <div>
            <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50`}>
                <nav className="flex justify-between items-center">
                    <div onClick={() => handleNavigation('/')} className="text-2xl font-bold text-gold cursor-pointer">
                        Nex Gen Market
                    </div>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <div onClick={() => handleNavigation('/products')} className={`cursor-pointer ${currentPage === '/products' ? 'underline underline-offset-4' : ''}`}>
                                Products
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/about')} className={`cursor-pointer ${currentPage === '/about' ? 'underline underline-offset-4' : ''}`}>
                                About
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/contact')} className={`cursor-pointer ${currentPage === '/contact' ? 'underline underline-offset-4' : ''}`}>
                                Contact
                            </div>
                        </li>
                    </ul>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <div onClick={() => setShowCart(true)} className="mr-2 cursor-pointer flex flex-col items-center relative group">
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

            {showCart && <CartPopUp items={[]} onClose={() => setShowCart(false)} />}
            <Outlet />
        </div>
    );
};
