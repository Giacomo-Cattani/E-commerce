import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, NotFound, About, Products as MainProducts, ProductDetails as MainProductDetails, Contact, Profile } from './pages';
import { Header, BigSpinner, PrivateRoute, HeaderAdmin } from './components';
import { Customers, Dashboard, Inventory, Orders, ProductDetails, Products } from './pages/admin'
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
          element: <PrivateRoute><Login theme={theme} /></PrivateRoute>
        },
        {
          path: '/signup',
          element: <PrivateRoute><SignUp theme={theme} /></PrivateRoute>
        },
        {
          path: '/about',
          element: <About theme={theme} />
        },
        {
          path: '/products',
          element: <MainProducts theme={theme} />
        },
        {
          path: '/product/:id',
          element: <MainProductDetails theme={theme} />
        },
        {
          path: '/cart',
          element: <div>Ciao</div>
        },
        {
          path: '/contact',
          element: <Contact theme={theme} />
        },
        {
          path: '/profile',
          element: <PrivateRoute><Profile theme={theme} /></PrivateRoute>
        },
        {
          path: '/checkout',
          element: <div>Ciao</div>
        },
        {
          path: '*',
          element: <NotFound theme={theme} />
        },
      ],
    },
    {
      path: '/admin',
      element: <PrivateRoute><HeaderAdmin theme={theme} toggleTheme={toggleTheme} /></PrivateRoute>,
      children: [
        {
          path: '/admin',
          element: <Dashboard theme={theme} />
        },
        {
          path: 'products',
          element: <Products theme={theme} />
        },
        {
          path: 'products/:id',
          element: <ProductDetails theme={theme} />
        },
        {
          path: 'orders',
          element: <Orders theme={theme} />
        },
        {
          path: 'customers',
          element: <Customers theme={theme} />
        },
        {
          path: 'inventory',
          element: <Inventory theme={theme} />
        },
      ]
    }
  ]
  );

  return (
    <AuthProvider>
      <div className={`${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'}`}>
        <RouterProvider router={router} fallbackElement={<BigSpinner />} />
      </div>
    </AuthProvider>
  );
};

export default App;