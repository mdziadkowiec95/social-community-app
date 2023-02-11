import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';

export function Root() {
  return (
    <div>
      <Link to='join'>Join us</Link>
      <Link to='app'>App</Link>
      <main>
        <Container>
          <a
            data-testid='go-to-react-page'
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
