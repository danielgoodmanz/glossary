//imports
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import App from '@/src/App';
import Add from '@/pages/Add';
import ErrorPage from '@/pages/Error-page';

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
    //@ts-ignore
    element: <Add />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
