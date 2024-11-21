import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
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

    return (
        <div className="min-h-screen flex flex-col">
            <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50`}>
                <nav className="flex justify-between items-center">
                    <div onClick={() => navigate('/')} className=" mr-2 cursor-pointer flex flex-row items-center relative group">
                        <IconHome className="mr-2" size={20} />
                        <div className="text-lg font-bold">Home</div>
                    </div>
                    <ul className="flex space-x-4">
                        <li >
                            <div onClick={() => navigate('/admin/')} className="flex items-center cursor-pointer hover:text-gray-400">
                                <IconLayoutDashboard className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Dashboard</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/products')} className="flex items-center flex-row cursor-pointer hover:text-gray-400">
                                <IconBox className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Products</span>
                            </div>
                        </li>
                        <li >
                            <div onClick={() => navigate('/admin/orders')} className="flex items-center cursor-pointer hover:text-gray-400">
                                <IconShoppingCart className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Orders</span>
                            </div>
                        </li>
                        <li >
                            <div onClick={() => navigate('/admin/customers')} className="flex items-center cursor-pointer hover:text-gray-400">
                                <IconUsers className="inline-block mr-2" size={20} /> <span className="hidden sm:inline">Customers</span>
                            </div>
                        </li>
                        <li >
                            <div onClick={() => navigate('/admin/inventory')} className="flex items-center cursor-pointer hover:text-gray-400">
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