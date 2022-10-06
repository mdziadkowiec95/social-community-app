import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoot } from '../pages/app/AppRoot';
import Dashboard from '../pages/app/Dashboard';
import { NonAuthRoot } from '../pages/non-auth/NonAuthRoot';
import { JoinUs } from '../pages/non-auth/JoinUs';
import { TermsOfUse } from '../pages/non-auth/TermsOfUse';

const router = createBrowserRouter([
  {
    // Path for not authenticated users. If authenticated will be automatically redirected to /auth
    path: '/',
    element: <NonAuthRoot />,
    children: [
      {
        path: '',
        element: <JoinUs />,
      },
      {
        path: 'terms-of-use',
        element: <TermsOfUse />,
      },
    ],
  },
  {
    path: '/app',
    element: <AppRoot />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export const AppRouterProvider = () => <RouterProvider router={router} />;
