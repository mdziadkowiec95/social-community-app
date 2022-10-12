import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { NavMenu } from 'features/navigation/components/NavMenu/NavMenu';

export const NonAuthRoot = () => {
  fetch('/api/user/login', {
    method: 'post',
  });

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
