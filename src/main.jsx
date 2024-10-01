//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';

//pages
import App from './App.jsx';
import Add from '../pages/Add.jsx';
import Edit from '../pages/Edit.jsx';
import ErrorPage from '../pages/Error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: '/edit',
      //   element: <Edit />,
      // },
      { path: '/add', element: <Add /> },
    ],
  },
  {},
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
