import React, { Component } from 'react';
// import JobsTable from '../components/JobsTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from './Header'
import Map from './Map'

import * as headerActions from '../actions/header'
import { loadData } from '../actions/main'

class App extends Component {

  // async fetchMetaData123() {
  //   const per_page = 10;
  //   const HHAPIURL = `https://api.hh.ru/vacancies?area=1&text=react&${per_page}`;
  //   let allData = [];
  //   let morePagesAvailable = true;
  //   let currentPage = 0;
  //   while (morePagesAvailable) {
  //     console.log(`${HHAPIURL}&page=${currentPage}`)
  //     const response = fetch(`${HHAPIURL}&page=${currentPage}`)
  //     let { clusters, data, total_pages } = response.json();
  //     console.log(data, total_pages);
  //     data.items.forEach(e => allData.push(e));
  //     morePagesAvailable = currentPage < total_pages;
  //     currentPage++;
  //   }
  //   this.setState({ data: allData });
  //   console.log(allData);
  // }
  // fetchMetaData = () => {
  //   this.setState({ isLoadData: false, data: [] }); // может и не успеть очиститься, да-да
  //   // const perPage = 'per_page=50'; //количество вакансий на странице (ограничение 100)
  //   const metro = +this.state.metroStationId ? 'metro=' + this.state.metroStationId : '';
  //   const text = (this.state.text && `text=${this.state.text.split(' ').join('+')}`) || '';
  //   const addUrl = [metro, text].join('&');
  //   const baseUrl = `https://api.hh.ru/vacancies?area=1&${addUrl}`;
  //   let pagesRequired = 0;

  //   fetch(`${baseUrl}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Something went wrong ...');
  //       }
  //     })
  //     .then(resp => {
  //       let dataFull = [];
  //       console.log('найдено вакансий: ', resp.found, '; страниц', resp.pages);

  //       pagesRequired = resp.pages;
  //       for (let i = 0; i < pagesRequired; i++) {
  //         fetch(`${baseUrl}&page=${i}`)
  //           .then(response => {
  //             if (response.ok) {
  //               return response.json();
  //             } else {
  //               throw new Error('Something went wrong ...');
  //             }
  //           })
  //           .then(data => { console.log(data); return this.setState({ data: [...this.state.data, ...data.items] }) })
  //       }
  //       // console.log(dataFull)
  //       // Promise.all(dataFull)
  //       // .then(responses => {
  //       //     const processedResponses = [];
  //       //     return responses.map(response => {
  //       //         processedResponses.push(response);
  //       //     })
  //       //   })
  //       // .then(data => this.setState({ data }))

  //     }).then(() => this.setState({ isLoadData: true }))

  // }
  // onFindJobs = () => {
  //   this.setState({ isLoadData: false });
  //   const perPage = 'per_page=100'; //количество вакансий на странице (ограничение 100)
  //   const metro = +this.state.metroStationId ? 'metro=' + this.state.metroStationId : '';
  //   const text = 'text=' + this.state.text.split(' ').join('+');
  //   const addUrl = [perPage, metro, text].join('&');
  //   const baseUrl = `https://api.hh.ru/vacancies?area=1&${addUrl}`;
  //   fetch(`${baseUrl}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Something went wrong ...');
  //       }
  //     })
  //     .then(data => this.setState({ data, isLoadData: true }))
  //     .catch(error => this.setState({ error }));
  // }

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
              // <div>map here</div>
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

