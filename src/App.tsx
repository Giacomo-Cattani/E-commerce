import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, NotFound } from './pages';
// import { Home, Products, ProductDetails, Cart, Checkout, About, Contact } from './pages';
import { Header, BigSpinner, PrivateRoute } from './components';
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
          element: <div>Ciao</div>
        },
        {
          path: '/products',
          element: <div>Ciao</div>
        },
        {
          path: '/product/:id',
          element: <div>Ciao</div>
        },
        {
          path: '/cart',
          element: <div>Ciao</div>
        },
        {
          path: '/contact',
          element: <div>Ciao</div>
        },
        {
          path: '/profile',
          element: <PrivateRoute><div>Ciao</div></PrivateRoute>
        },
        {
          path: '/checkout',
          element: <div>Ciao</div>
        },
        {
          path: '*',
          element: <NotFound theme={theme} />
        },
      ]
    },
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