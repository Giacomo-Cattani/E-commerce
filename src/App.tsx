import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages';
// import { Home, Products, ProductDetails, Cart, Checkout, About, Contact } from './pages';
import { Header, BigSpinner } from './components';
import { useState } from 'react';


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
        }
      ]
    },
    // {
    //   path: '/products',
    //   element: <Products />
    // },
    // {
    //   path: '/product/:id',
    //   element: <ProductDetails />
    // },
    // {
    //   path: '/cart',
    //   element: <Cart />
    // },
    // {
    //   path: '/checkout',
    //   element: <Checkout />
    // },
    // {
    //   path: '/about',
    //   element: <About />
    // },
    // {
    //   path: '/contact',
    //   element: <Contact />
    // }
  ]);

  return (
    <div className={`${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'}`}>
      <RouterProvider router={router} fallbackElement={<BigSpinner />} />
    </div>
  );
};

export default App;