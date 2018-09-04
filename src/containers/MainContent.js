import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import JobsList from './JobsList';
import Map from './Map';
import { CustomLink } from '../components/CustomLink';

export const MainContent = props => (
  <Fragment>
    <nav className="nav nav-pills justify-content-center text-center my-3">
      <CustomLink
        to="/vacancies"
        isExact
        params={props.history.location.search}
        label="Вакансии"
      />
      <CustomLink
        to="/map"
        isExact
        params={props.history.location.search}
        label="Карта"
      />
    </nav>
    <Route exact path="/vacancies" component={JobsList} />
    <Route exact path="/map" component={Map} />
  </Fragment>
);
