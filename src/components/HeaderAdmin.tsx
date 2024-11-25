import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    IconSun, IconMoon, IconHome, IconLayoutDashboard,
    IconBox, IconShoppingCart, IconUsers, IconClipboard
} from '@tabler/icons-react';

interface HeaderAdminProps {
    theme: string;
    toggleTheme: () => void;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname]);

    const handleNavigation = (path: string) => {
        navigate(path);
        setCurrentPage(path);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50`}>
                <nav className="flex justify-between items-center">
                    <div onClick={() => handleNavigation('/')} className="mr-2 cursor-pointer flex flex-row items-center relative group">
                        <IconHome className="mr-2" size={20} />
                        <div className="text-lg font-bold">Home</div>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <div onClick={() => handleNavigation('/admin/')} className={`flex items-center cursor-pointer hover:text-gray-400 ${currentPage === '/admin/' ? 'underline underline-offset-4' : ''}`}>
                                <IconLayoutDashboard className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Dashboard</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/admin/products')} className={`flex items-center flex-row cursor-pointer hover:text-gray-400 ${currentPage === '/admin/products' ? 'underline underline-offset-4' : ''}`}>
                                <IconBox className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Products</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/admin/orders')} className={`flex items-center cursor-pointer hover:text-gray-400 ${currentPage === '/admin/orders' ? 'underline underline-offset-4' : ''}`}>
                                <IconShoppingCart className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Orders</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/admin/customers')} className={`flex items-center cursor-pointer hover:text-gray-400 ${currentPage === '/admin/customers' ? 'underline underline-offset-4' : ''}`}>
                                <IconUsers className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Customers</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => handleNavigation('/admin/inventory')} className={`flex items-center cursor-pointer hover:text-gray-400 ${currentPage === '/admin/inventory' ? 'underline underline-offset-4' : ''}`}>
                                <IconClipboard className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Inventory</span>
                            </div>
                        </li>
                    </ul>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                        {theme === 'dark' ? <IconSun className="text-yellow-500" size={20} /> : <IconMoon className="text-neutral-500" size={20} />}
                    </button>
                </nav>
            </header>
            <Outlet />
        </div>
    );
};