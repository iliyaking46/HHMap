import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import JobsList from './JobsList';
import VacancyPage from './VacancyPage';
import Header from './Header';
import Map from './Map';
import { CustomLink } from '../components/CustomLink';

const history = createHistory();

const MainLayout = () => (
  <div
    className={`container main-layout ${
      history.location.pathname !== '/' ? `layout-show` : `0`
    } `}
  >
    <nav className="nav nav-pills justify-content-center text-center my-md-3">
      <CustomLink
        to={`/vacancies`}
        isExact
        params={history.location.search}
        label="Вакансии"
      />
      <CustomLink
        to={`/map`}
        isExact
        params={history.location.search}
        label="Карта"
      />
    </nav>
    <Route exact path="/vacancies" component={JobsList} />
    <Route exact path="/map" component={Map} />
  </div>
);

const home = () => (
  <div
    className={
      history.location.pathname !== '/' ? `main-page hidden` : `main-page`
    }
  >
    <div className="search-field">
      <Header history={history} />
    </div>
    <div
      className={`container main-layout ${
        history.location.pathname !== '/' ? `layout-show` : `0`
      } `}
    >
      <Switch>
        <Route exact path="/vacancies" component={MainLayout} />
        <Route exact path="/map" component={MainLayout} />
        <Route path="/vacancy/:id" component={VacancyPage} />
      </Switch>
    </div>
  </div>
);

const App = () => (
  <Router history={history}>
    <div className="wrapper">
      <Route path="/" component={home} />
    </div>
  </Router>
);
export default App;
