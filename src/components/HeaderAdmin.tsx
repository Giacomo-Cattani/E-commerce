import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

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
                    <div className="text-lg font-bold">Admin Dashboard</div>
                    <ul className="flex space-x-4">
                        <li>
                            <div onClick={() => navigate('/admin/dashboard')} className="cursor-pointer hover:text-gray-400">Dashboard</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/products')} className="cursor-pointer hover:text-gray-400">Products</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/orders')} className="cursor-pointer hover:text-gray-400">Orders</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/customers')} className="cursor-pointer hover:text-gray-400">Customers</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/inventory')} className="cursor-pointer hover:text-gray-400">Inventory</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/reports')} className="cursor-pointer hover:text-gray-400">Reports</div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/admin/promotions')} className="cursor-pointer hover:text-gray-400">Promotions</div>
                        </li>
                    </ul>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                        {theme === 'dark' ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-neutral-500" size={20} />}
                    </button>
                </nav>
            </header>
            <Outlet />
        </div>
    );
};