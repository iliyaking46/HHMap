import React, { Component } from 'react';
import JobsTable from '../components/JobsTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from './Header'
import Map from './Map'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import * as headerActions from '../actions/header'
import { loadData } from '../actions/main'

class App extends Component {
  componentDidMount() {
    this.props.headerActions.loadMetro();
  }

  render() {
    const { data, isLoadData } = this.props.app;
    const loader = <div className="indicator"><svg width="16px" height="12px"><polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline><polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline></svg></div>;
    
    const home = () => data.length > 0 && isLoadData ? (
      <JobsTable data={data} />
    ) : (
        data.length === 0 && isLoadData ? (
          <div><h3 className="text-center">Найдено 0 вакансий, выполните новый запрос</h3></div>
        ) : (
            loader
          )
      )

    return (
      <Router>
        <div className="container mt-5">
          <h1 className="text-center" >HH Map Jobs-Finder</h1>
          <Header header={this.props.header} action={this.props.headerActions} loadData={this.props.loadData} />
          <nav className="nav">
            <Link className="nav-link" to="/">К вакансиям</Link>
            <Link className="nav-link" to="/map">На карте</Link>
            {/* <Link to="/topics">Topics</Link> */}
          </nav>
          <Route exact path="/" component={home} />
          <Route path="/map" component={() => <Map data={data} />} />
          {/* <Route path="/topics" component={Topics} /> */}
        </div>
      </Router>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    headerActions: bindActionCreators(headerActions, dispatch),
    loadData: bindActionCreators(loadData, dispatch)
  }
}

export default connect(state => ({
  app: state.app,
  header: state.header,
}), mapDispatchToProps)(App)

