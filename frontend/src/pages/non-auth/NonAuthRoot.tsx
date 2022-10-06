import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { LanguagePicker } from '../../features/navigation/components/LanguagePicker/LanguagePicker';

export const NonAuthRoot = () => {
  fetch('/api/user/login', {
    method: 'post',
  });

  return (
    <div>
      <LanguagePicker />
      <Link to='terms-of-use'>Terms of use</Link>
      <Link to='app'>App</Link>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};
