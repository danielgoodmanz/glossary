//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import App from './App.jsx';
import Add from '../pages/Add.jsx';
import ErrorPage from '../pages/Error-page.jsx';
import TermCard from './my_components/TermCard.jsx';
import Header from './my_components/Header.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/terms/:termName',
        element: <Header />,
      },
    ],
  },
  // {
  //   path: '/terms/:termName',
  //   element: <App />,
  // },
  {
    path: '/add',
    element: <Add />,
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
