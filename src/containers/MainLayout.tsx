import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';

export const MainLayout = () => {
  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <div className="wrapper">
      <div className={`main-page${isRoot ? '' : ' hidden'}`}>
        <div className="search-field">
          <Header />
        </div>
      </div>
      <div className={`container main-layout${isRoot ? '' : ' layout-show'}`}>
        <Outlet />
      </div>
    </div>
  );
};
