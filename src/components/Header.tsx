import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { IconUserCircle, IconShoppingCart, IconLogin, IconLogout } from '@tabler/icons-react';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    return (
        <header className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50`}>
            <nav className="flex justify-between items-center">
                <div onClick={() => navigate('/')} className="text-2xl font-bold text-gold cursor-pointer">
                    Nex Gen Market
                </div>
                <ul className="flex space-x-6 items-center">
                    <li><div onClick={() => navigate('/products')} className="cursor-pointer">Products</div></li>
                    <li><div onClick={() => navigate('/about')} className="cursor-pointer">About</div></li>
                    <li><div onClick={() => navigate('/contact')} className="cursor-pointer">Contact</div></li>
                </ul>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <div onClick={() => navigate('/profile')} className="cursor-pointer flex items-center space-x-2">
                            <IconShoppingCart stroke={1.2} className='mr-2 ml-20' color={`${theme === 'dark' ? 'white' : 'black'}`} />
                        </div>
                    </li>
                    <li style={{ marginLeft: '10px' }}>
                        <div onClick={() => navigate('/profile')} className="cursor-pointer flex items-center space-x-2">
                            <IconUserCircle stroke={1.2} className='mr-2' color={`${theme === 'dark' ? 'white' : 'black'}`} />
                        </div>
                    </li>
                    <li style={{ marginLeft: '10px' }}>
                        <div
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => navigate('/profile')} className="cursor-pointer flex items-center space-x-2">
                            {false ? (
                                <IconLogin
                                    stroke={1.2}
                                    color={`${hovered ? 'lime' : theme === 'dark' ? 'white' : 'black'}`}
                                />
                            ) : (
                                <IconLogout
                                    stroke={1.2}
                                    color={`${hovered ? 'red' : theme === 'dark' ? 'white' : 'black'}`}
                                    className="hover:text-red-500"
                                />
                            )}
                        </div>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
                            {theme === 'dark' ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-neutral-500" size={20} />}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
