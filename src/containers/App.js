import React, { Component } from 'react';
// import JobsTable from '../components/JobsTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from './Header'
import Map from './Map'

import * as headerActions from '../actions/header'
import { loadData } from '../actions/main'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMap: []
    }
  }

  componentDidMount() {
    this.props.headerActions.loadMetro();
  }

  render() {
    const { data, isLoadData } = this.props.app;
    const isLoad = this.props.header.isLoad;

    if (!isLoad) return <div className="indicator">
      <svg width="16px" height="12px">
        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
      </svg>
    </div>

    return (
      <div className="container mt-5">
        <h1 className="text-center" >HH Map Jobs-Finder</h1>
        <Header header={this.props.header} action={this.props.headerActions} loadData={this.props.loadData} />

        <div className="my-5" style={{ width: "100%" }}>
          {isLoadData ?
            (
              <Map data={data} />
            ) : (
              <div className="indicator">
                <svg width="16px" height="12px">
                  <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                  <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                </svg>
              </div>
            )
          }
        </div>
        {/* <div className="row justify-content-center">
        { isLoadData ?
          (
            <JobsTable data={data}/>
          ) : (
            <div>Data is loading...</div>
          )
        }
      </div> */}
      </div>
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

