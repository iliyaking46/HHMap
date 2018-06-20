import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const CustomLink = ({ label = '', to, isExact = false, params }) => (
  <Route path={to} exact={isExact}>
    {({ match }) => (
      <Link
        className={
          match ? 'active nav-link col col-md-3' : 'nav-link col col-md-3'
        }
        to={`${to}${params}`}
      >
        {label}
      </Link>
    )}
  </Route>
);
CustomLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.string.isRequired,
};
