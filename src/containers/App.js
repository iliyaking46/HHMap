import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import JobsList from './JobsList';
import VacancyPage from './VacancyPage';
import Header from './Header';
import Map from './Map';
import { CustomLink } from '../components/CustomLink';

const history = createHistory();

const App = () => {
  const home = () => <JobsList />;
  const map = () => <Map history={history} />;
  return (
    <Router history={history}>
      <div className="container mt-5">
        <h1 className="text-center">HH Map Jobs-Finder</h1>
        <Header history={history} />
        <nav className="nav nav-pills justify-content-center text-center my-3">
          <CustomLink isExact to="/" label="Вакансии" />
          <CustomLink isExact={false} to="/map" label="Карта" />
        </nav>
        <Route exact path="/" component={home} />
        <Route path="/map" component={map} />
        <Route path="/vacancies/:id" component={VacancyPage} />
      </div>
    </Router>
  );
};
export default App;
