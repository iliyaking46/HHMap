import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import JobsList from './JobsList';
import VacancyPage from './VacancyPage';
import Header from './Header';
import Map from './Map';
import { CustomLink } from '../components/CustomLink';

const history = createHistory();

const home = () => (
  <div className="main-page">
    <div className="search-field">
      <div className="container">
        <div className="search-wrapper">
          <h2 className="text-center mb-4 text-white">
            Найди работу своей мечты
          </h2>
          <Header history={history} />
        </div>
      </div>
    </div>
  </div>
);

const MainLayout = props => (
  <div className="container">
    <h2 className="text-center my-3 my-md-5">Найдите работу рядом с Вами!</h2>
    <Header history={history} />
    <nav className="nav nav-pills justify-content-center text-center my-md-3">
      <CustomLink isExact to="/vacancies" label="Вакансии" />
      <CustomLink isExact={false} to="/map" label="Карта" />
    </nav>
    {/* eslint-disable-next-line */}
    {props.children}
  </div>
);

const App = () => (
  <Router history={history}>
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={home} />
        <MainLayout>
          <Route exact path="/vacancies" component={JobsList} />
          <Route path="/map" component={Map} />
          <Route path="/vacancies/:id" component={VacancyPage} />
        </MainLayout>
      </Switch>
    </div>
  </Router>
);
export default App;
