import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IconMoon, IconSun, IconFlame } from '@tabler/icons-react';
import {
  IconUserCircle,
  // IconShoppingCart,
  IconLogin,
  IconLogout,
  IconShield,
} from '@tabler/icons-react';
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
  // const [showCart, setShowCart] = useState(false);
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
        <li key={i} className='rounded bg-white p-2 shadow dark:bg-neutral-700'>
          Row {i}
        </li>
      );
    }
    return rows;
  };

  return (
    <div className='grid-cols grid'>
      <div className={`col-span-${showCart ? '8' : '9'}`}>
        <header
          className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} fixed left-0 top-0 z-50 w-full px-6 py-4 shadow-md`}
        >
          <nav className='flex items-center justify-between'>
            <div
              onClick={() => handleNavigation('/')}
              className='text-gold cursor-pointer text-2xl font-bold'
            >
              Nex Gen Market
            </div>
            <ul className='flex items-center space-x-6'>
              <li className='group relative'>
                <div
                  onClick={() => handleNavigation('/catalog')}
                  className={`cursor-pointer ${currentPage === '/catalog' ? 'underline underline-offset-4' : ''} transition-transform duration-300 hover:font-bold group-hover:scale-110`}
                >
                  <span className='absolute -left-1 top-0 flex -translate-x-1/2 -translate-y-1/2 transform items-center'>
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      className='mt-5'
                    >
                      <defs>
                        <linearGradient
                          id='grad1'
                          x1='0%'
                          y1='0%'
                          x2='100%'
                          y2='100%'
                        >
                          <stop
                            offset='0%'
                            style={{ stopColor: 'red', stopOpacity: 1 }}
                          />
                          <stop
                            offset='100%'
                            style={{ stopColor: 'orange', stopOpacity: 1 }}
                          />
                        </linearGradient>
                      </defs>
                      <IconFlame
                        size={18}
                        className='-rotate-12'
                        color='url(#grad1)'
                        fill='url(#grad1)'
                      />
                    </svg>
                    <span className='-rotate-12 transform text-xs text-red-500'>
                      New
                    </span>
                  </span>
                  Catalog
                </div>
              </li>
              {/* <li>
                                <div onClick={() => handleNavigation('/products')} className={`cursor-pointer ${currentPage === '/products' ? 'underline underline-offset-4' : ''} transition-transform duration-300 group-hover:scale-110 hover:font-bold`}>
                                    Products
                                </div>
                            </li> */}
              <li>
                <div
                  onClick={() => handleNavigation('/about')}
                  className={`cursor-pointer ${currentPage === '/about' ? 'underline underline-offset-4' : ''} transition-transform duration-300 hover:font-bold group-hover:scale-110`}
                >
                  About
                </div>
              </li>
              <li>
                <div
                  onClick={() => handleNavigation('/contact')}
                  className={`cursor-pointer ${currentPage === '/contact' ? 'underline underline-offset-4' : ''} transition-transform duration-300 hover:font-bold group-hover:scale-110`}
                >
                  Contact
                </div>
              </li>
            </ul>
            <ul className='flex items-center space-x-6'>
              {/* <li>
                <div
                  onClick={() => setShowCart(!showCart)}
                  className='group relative mr-2 flex cursor-pointer flex-col items-center'
                ></div>
                <div
                  onClick={() => setShowCart(!showCart)}
                  className='group relative mr-2 flex cursor-pointer flex-col items-center'
                >
                  <IconShoppingCart
                    stroke={1.2}
                    color={`${theme === 'dark' ? 'white' : 'black'}`}
                  />
                  <div className='absolute bottom-0 translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                    Cart
                  </div>
                </div>
              </li> */}
              <li style={{ marginLeft: '10px' }}>
                <div
                  onClick={() => handleNavigation('/profile')}
                  className='group relative mr-2 flex cursor-pointer flex-col items-center'
                >
                  <IconUserCircle
                    stroke={1.2}
                    color={`${theme === 'dark' ? 'white' : 'black'}`}
                  />
                  <div className='absolute bottom-0 translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                    Profile
                  </div>
                </div>
              </li>
              {admin && (
                <li style={{ marginLeft: '10px' }}>
                  <div
                    onClick={() => handleNavigation('/admin')}
                    className='group relative mr-2 flex cursor-pointer flex-col items-center'
                  >
                    <IconShield
                      stroke={1.2}
                      color={`${theme === 'dark' ? 'white' : 'black'}`}
                    />
                    <div className='absolute bottom-0 translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
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
                  }}
                  className='group relative mr-2 flex cursor-pointer flex-col items-center'
                >
                  {!isLoggedIn ? (
                    <>
                      <IconLogin
                        stroke={1.2}
                        color={`${hovered ? 'lime' : theme === 'dark' ? 'white' : 'black'}`}
                      />
                      <div className='absolute bottom-0 translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                        Login
                      </div>
                    </>
                  ) : (
                    <>
                      <IconLogout
                        stroke={1.2}
                        color={`${hovered ? 'red' : theme === 'dark' ? 'white' : 'black'}`}
                        className='hover:text-red-500'
                      />
                      <div className='absolute bottom-0 translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                        Logout
                      </div>
                    </>
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className='rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                >
                  {theme === 'dark' ? (
                    <IconSun className='text-yellow-500' size={20} />
                  ) : (
                    <IconMoon className='text-neutral-500' size={20} />
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </div>
      {showCart ? (
        <div className='fixed right-0 top-16 col-span-1 h-screen overflow-y-scroll scrollbar-hide'>
          <ul className='space-y-4 p-4'>{renderRows()}</ul>
        </div>
      ) : null}
    </div>
  );
};
