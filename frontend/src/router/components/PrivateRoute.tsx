import React from 'react';
import { Navigate } from 'react-router';
import { useAuthUserQuery } from '../../features/auth/store/authApi';
import { getAuthTokenFromStorage } from '../../utils/auth';

type PrivateRouteProps = { children: React.ReactElement };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data, isLoading } = useAuthUserQuery({
    authToken: getAuthTokenFromStorage(),
  });

  // If user is not available then redirect to Guest route
  if (!isLoading && !data) {
    return <Navigate to='/' />;
  }

  return children;
};

export { PrivateRoute };
