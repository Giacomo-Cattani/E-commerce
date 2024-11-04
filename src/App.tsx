import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, NotFound } from './pages';
// import { Home, Products, ProductDetails, Cart, Checkout, About, Contact } from './pages';
import { Header, BigSpinner } from './components';
import { useState } from 'react';
import { SignUp } from './pages/SignUp';
import { AuthProvider } from './context';


const App = () => {

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header theme={theme} toggleTheme={toggleTheme} />,
      children: [
        {
          path: '/',
          element: <Home theme={theme} />
        },
        {
          path: '/login',
          element: <Login theme={theme} />
        },
        {
          path: '/signup',
          element: <SignUp theme={theme} />
        },
        {
          path: '*',
          element: <NotFound theme={theme} />
        },
      ]
    },
    // {
    //   path: '/products',
    //   element: <Products theme={theme} />
    // },
    // {
    //   path: '/product/:id',
    //   element: <ProductDetails theme={theme} />
    // },
    // {
    //   path: '/cart',
    //   element: <Cart theme={theme} />
    // },
    // {
    //   path: '/checkout',
    //   element: <Checkout theme={theme} />
    // },
    // {
    //   path: '/about',
    //   element: <About theme={theme} />
    // },
    // {
    //   path: '/contact',
    //   element: <Contact theme={theme} />
    // }
  ]);

  return (
    <AuthProvider>
      <div className={`${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'}`}>
        <RouterProvider router={router} fallbackElement={<BigSpinner />} />
      </div>
    </AuthProvider>
  );
};

export default App;