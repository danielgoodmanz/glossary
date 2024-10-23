//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import App from './App.jsx';
import Add from '../pages/Add.jsx';
import ErrorPage from '../pages/Error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    //show single term
    children: [
      {
        path: '/terms/:name',
      },
    ],
  },
  {
    path: '/add',
    element: <Add />,
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
