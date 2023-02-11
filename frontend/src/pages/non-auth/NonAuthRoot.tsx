import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { NavMenu } from 'features/navigation/components/NavMenu/NavMenu';
import { useAuthUserQuery } from '../../features/auth/store/authApi';

export const NonAuthRoot = () => {
  const { data: user, isLoading } = useAuthUserQuery({
    authToken: localStorage.getItem('auth_token') ?? '',
  });

  // If user is available then redirect to App route
  if (!isLoading && user) {
    return <Navigate to='/app' />;
  }

  return (
    <div>
      <NavMenu />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};
