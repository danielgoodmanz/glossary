//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import App from './App.jsx';
import Add from '../pages/Add.js';
import ErrorPage from '../pages/Error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:termName',
    element: <App />,
  },
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
