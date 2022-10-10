import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from '../../features/navigation/components/NavMenu/NavMenu';

export const AppRoot = () => {
  return (
    <div>
      <NavMenu isAuth />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
