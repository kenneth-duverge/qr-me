import { LogSnagProvider } from '@logsnag/react';
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '@clerk/clerk-react';

import { Create } from './routes/create';
import { Root } from './routes/root';
import { Profiles } from './routes/profiles';
import { Index } from './routes/index';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isSignedIn) return null;

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorElement />,
    children: [
      {
        path: '',
        element: <Index />,
      },
      {
        path: 'profiles',
        element: <ProtectedRoute />,
        children: [{ path: '/profiles', element: <Profiles /> }],
      },
      {
        path: 'create',
        element: <ProtectedRoute />,
        children: [{ path: '/create', element: <Create /> }],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <LogSnagProvider project="duverge-tech" token="8db9eda1de780c6d0bb915a34159d33d">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LogSnagProvider>
  );
}
