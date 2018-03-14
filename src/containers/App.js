import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import JobsTable from './JobsTable'
import Header from './Header'
import Map from './Map'
import VacancyPage from './VacancyPage'

const history = createHistory()

const App = () => {
  const home = () => <JobsTable />
  const map = () => <Map history={history} />
  return (
    <Router history={history}>
      <div className="container mt-5">
        <h1 className="text-center">HH Map Jobs-Finder</h1>
        <Header history={history} />
        <nav className="nav">
          <Link className="nav-link" to="/">
            К вакансиям
          </Link>
          <Link className="nav-link" to="/map">
            На карте
          </Link>
        </nav>
        <Route exact path="/" component={home} />
        <Route path="/map" component={map} />
        <Route path="/vacancies/:id" component={VacancyPage} />
      </div>
    </Router>
  )
}
export default App
