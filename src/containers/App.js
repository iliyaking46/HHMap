import React, { Component } from 'react';
import JobsTable from '../components/JobsTable';
import { connect } from 'react-redux';
import Header from './Header'
import Map from './Map'
import VacancyPage from './VacancyPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    const { data, isLoadData, paramOfData } = this.props.app;
    const loader = <div className="indicator"><svg width="16px" height="12px"><polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline><polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline></svg></div>;
    
    const home = () => data.length > 0 && isLoadData ? (
      <JobsTable data={data} paramOfData={paramOfData} />
    ) : (
        data.length === 0 && isLoadData ? (
          <div><h3 className="text-center">Найдено 0 вакансий, выполните новый запрос</h3></div>
        ) : (
            loader
          )
      )
    const map = () => isLoadData ? <Map data={data} /> : loader;

    return (
      <Router>
        <div className="container mt-5">
          <h1 className="text-center" >HH Map Jobs-Finder</h1>
          {/* <Header header={this.props.header} action={this.props.headerActions} loadData={this.props.loadData} /> */}
          <Header />
          <nav className="nav">
            <Link className="nav-link" to="/">К вакансиям</Link>
            {data.length === 0 ? <span className="nav-link disabled" href="">На карте</span>  : <Link className="nav-link" to="/map">На карте</Link>  }
            {/* <Link to="/topics">Topics</Link> */}
          </nav>
          <Route exact path="/" component={home} />
          <Route path="/map" component={map} />
          <Route path="/vacancies/:id" component={VacancyPage} />
        </div>
      </Router>
    )
  }
}

export default connect(state => ({
  app: state.app,
}))(App)

