import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import JobsList from './JobsList';
import VacancyPage from './VacancyPage';
import Header from './Header';
import Map from './Map';
import { CustomLink } from '../components/CustomLink';

const MainLayout = props => (
  <div
    className={`container main-layout ${
      props.location.pathname !== '/' ? `layout-show` : ``
    } `}
  >
    <nav className="nav nav-pills justify-content-center text-center my-md-3">
      <CustomLink
        to={`/vacancies`}
        isExact
        params={props.history.location.search}
        label="Вакансии"
      />
      <CustomLink
        to={`/map`}
        isExact
        params={props.history.location.search}
        label="Карта"
      />
    </nav>
    <Route exact path="/vacancies" component={JobsList} />
    <Route exact path="/map" component={Map} />
  </div>
);

const Home = props => (
  <div
    className={
      props.location.pathname !== '/' ? `main-page hidden` : `main-page`
    }
  >
    <div className="search-field">
      <Header history={props.history}/>
    </div>
    <div
      className={`container main-layout
      ${props.location.pathname !== '/' ? `layout-show` : ``}`}
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
  <Router>
    <div className="wrapper">
      <Route path="/" component={Home} />
    </div>
  </Router>
);
export default App;
