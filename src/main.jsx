//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import App from './App.jsx';
import Add from '../pages/Add.jsx';
import ErrorPage from '../pages/Error-page.jsx';
import Container from './my_components/Container.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/:termName',
        element: <Container />,
      },
    ],
  },
  ,
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
