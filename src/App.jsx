import { useEffect, useState } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
  ScrollRestoration,
} from 'react-router-dom';

// global css
import './App.css';

// Routes
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Shop from './pages/Shop.jsx';
import Info from './pages/Info.jsx';
import Footer from './components/Footer.jsx';
import SuccessPage from './pages/redirects/SuccessPage.jsx';
import CancelPage from './pages/redirects/CancelPage.jsx';
import NotFoundPage from './pages/redirects/NotFoundPage.jsx';

import { useDispatch } from 'react-redux';
import { getCartAction } from './store/action.js';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartAction());
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-4.8rem)]">{children}</div>
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      element: (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ),
      children: [
        {
          path: '/',
          // element: <Home />,
          element: <Shop />,
        },
        {
          path: '/shop',
          element: <Shop />,
        },
        // {
        //   path: '/info',
        //   element: <Info />,
        // },
        // {
        //   path: '/success',
        //   element: <SuccessPage />,
        // },
        // {
        //   path: '/cancel',
        //   element: <CancelPage />,
        // },
        // {
        //   path: '*',
        //   element: <NotFoundPage />,
        // },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
    },
  }
);

const App = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: false }} />
  );
};

export default App;
