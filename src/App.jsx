// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

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
import Test1 from './pages/Test1.jsx';
import Test2 from './pages/Test2.jsx';
import Info from './pages/Info.jsx';
import Footer from './components/Footer.jsx';

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
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
          element: <Home />,
        },
        {
          path: '/shop',
          element: <Shop />,
        },
        {
          path: '/info',
          element: <Info />,
        },
        {
          path: '/test1',
          element: <Test1 />,
        },
        {
          path: '/test2',
          element: <Test2 />,
        },
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
