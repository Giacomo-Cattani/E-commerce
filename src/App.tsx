import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, NotFound, About, Products as MainProducts, ProductDetails as MainProductDetails, Contact, Profile } from './pages';
import { Header, PrivateRoute, HeaderAdmin, SkeletonLoader } from './components';
import { Customers, Dashboard, Inventory, Orders, ProductDetails, Products } from './pages/admin'
import { useEffect, useState } from 'react';
import { SignUp } from './pages/SignUp';
import { AuthProvider, useAuth } from './context';
import { account } from './appwrite';

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const [theme, setTheme] = useState('dark');
  const { loading } = useAuth();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const prefs = await account.getPrefs();
        if (prefs.theme) {
          setTheme(prefs.theme);
        }
      } catch (error) {
        console.error('Failed to fetch theme:', error);
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    const prefs = await account.getPrefs();
    prefs.theme = theme === 'dark' ? 'light' : 'dark';
    await account.updatePrefs({ ...prefs });
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
    <div className={`${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'}`}>
      {loading ? <SkeletonLoader /> : null}
      <RouterProvider router={router} fallbackElement={<SkeletonLoader />} />

    </div>
  );
};

export default App;