import React, { Component } from 'react';
import JobsTable from './JobsTable';
import Header from './Header'
import Map from './Map'
import VacancyPage from './VacancyPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    const loader = <div className="indicator"><svg width="16px" height="12px"><polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline><polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline></svg></div>;
    const home = () => <JobsTable /> 
    // (
    //   <JobsTable />
    // ) : (
    //     data.length === 0 && isLoadData ? (
    //       <div><h3 className="text-center">Найдено 0 вакансий, выполните новый запрос</h3></div>
    //     ) : (
    //         loader
    //       )
    //   )
    const map = () => <Map />;

    return (
      <Router>
        <div className="container mt-5">
          <h1 className="text-center" >HH Map Jobs-Finder</h1>
          <Header />
          <nav className="nav">
            <Link className="nav-link" to="/vacancies">К вакансиям</Link>
            <Link className="nav-link" to="/map">На карте</Link>
          </nav>
          <Route exact path="/vacancies" component={home} />
          <Route path="/map" component={map} />
          {/* <Route path="/vacancies/:id" component={VacancyPage} /> */}
        </div>
      </Router>
    )
  }
}
