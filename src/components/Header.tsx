import React from 'react';
import { redirect } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import image from '../assets/user-profile-filled-svgrepo-com.svg';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    // const navigate = useNavigate();

    return (
        <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md`}>
            <nav className="flex justify-between items-center">
                <div onClick={() => redirect('/')} className="text-2xl font-bold text-gold cursor-pointer">
                    Nex Gen Market
                </div>
                <ul className="flex space-x-6 items-center">
                    <li><div onClick={() => redirect('/products')} className="cursor-pointer">Products</div></li>
                    <li><div onClick={() => redirect('/cart')} className="cursor-pointer">Cart</div></li>
                    <li><div onClick={() => redirect('/about')} className="cursor-pointer">About</div></li>
                    <li><div onClick={() => redirect('/contact')} className="cursor-pointer">Contact</div></li>
                    <li>
                        <div onClick={() => redirect('/profile')} className="cursor-pointer flex items-center space-x-2">
                            <img src={image} className={`w-7 h-7 mt-1 rounded-full ${theme === 'dark' ? 'filter invert' : ''}`} />
                            {/* <span>Profile</span> */}
                        </div>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                            {theme === 'dark' ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-neutral-500" size={20} />}
                        </button>
                    </li>
                </ul>
            </nav>
        </header >
    );
};
