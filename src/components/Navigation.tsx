import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <nav className="nav nav-pills justify-content-center text-center my-3">
        <NavLink
          className="nav-link col col-md-3"
          to={'/vacancies' + location.search}
          children="Вакансии"
        />
        <NavLink
          className="nav-link col col-md-3"
          to={'/map' + location.search}
          children="Карта"
        />
      </nav>
      <Outlet />
    </>
  );
};