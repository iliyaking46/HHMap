import React, { Component } from 'react';
// import JobsTable from '../components/JobsTable';
import HeaderApp from './HeaderApp'
import Map from './Map'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      metro: [], //тут хранятся все линии, а в них станции (stations)
      data: [], //вакансии
      // metroStationId: '', //хранится конкретная станция (поставил кутузувскую, там вакансии есть)
      // text: '', //фраза для поиска
      isLoad: true,
      isLoadData: false,
      error: '',
    }
  }

  // async fetchMetaData() {
  //   const per_page = 10;
  //   const HHAPIURL = `https://api.hh.ru/vacancies?area=1&text=react&${per_page}`;
  //   let allData = [];
  //   let morePagesAvailable = true;
  //   let currentPage = 0;
    
  //   while(morePagesAvailable) {
  //     console.log(`${HHAPIURL}&page=${currentPage}`)
  //     const response = fetch(`${HHAPIURL}&page=${currentPage}`)
  //     let { clusters, data, total_pages } = response.json();
  //     console.log(data, total_pages);      
  //     data.items.forEach(e => allData.push(e));
  //     morePagesAvailable = currentPage < total_pages;
  //     currentPage++;
  //   }
  //   this.setState({data: allData});
  //   console.log(allData);
    
  // }


  fetchMetaData = () => {
    this.setState({ isLoadData: false, data: [] }); // может и не успеть очиститься, да-да
    // const perPage = 'per_page=50'; //количество вакансий на странице (ограничение 100)
    const metro = +this.state.metroStationId ? 'metro='+this.state.metroStationId : '';
    const text = (this.state.text && `text=${this.state.text.split(' ').join('+')}`) || '';
    const addUrl = [metro, text].join('&');
    const baseUrl = `https://api.hh.ru/vacancies?area=1&${addUrl}`;
    let pagesRequired = 0;

    fetch(`${baseUrl}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(resp => {
        let dataFull = [];
        console.log('найдено вакансий: ', resp.found, '; страниц', resp.pages);
        
        pagesRequired = resp.pages;
        for (let i = 0; i < pagesRequired ; i++) {
          fetch(`${baseUrl}&page=${i}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => { console.log(data); return this.setState({ data: [...this.state.data, ...data.items] })} )
        }
        // console.log(dataFull)
        // Promise.all(dataFull)
        // .then(responses => {
        //     const processedResponses = [];
        //     return responses.map(response => {
        //         processedResponses.push(response);
        //     })
        //   })
        // .then(data => this.setState({ data }))

    }).then(() => this.setState({ isLoadData: true }) )
    
  }

            // do something with processedResponses here
  onFindJobs = () => {
    this.setState({ isLoadData: false });
    const perPage = 'per_page=100'; //количество вакансий на странице (ограничение 100)
    const metro = +this.state.metroStationId ? 'metro='+this.state.metroStationId : '';
    const text = 'text='+this.state.text.split(' ').join('+');
    const addUrl = [perPage, metro, text].join('&');
    const baseUrl = `https://api.hh.ru/vacancies?area=1&${addUrl}`;
    fetch(`${baseUrl}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ data, isLoadData: true }))
      .catch(error => this.setState({ error }));
  }



  render() {
    const { metro, data, metroStationId, text, isLoad, isLoadData } = this.state

    if (!isLoad) return (<div>Loading...</div>) 
   
    return(
    <div className="container mt-5">
      <h1 className="text-center" >HH Map Jobs-Finder</h1>
      <HeaderApp />

      <div className="my-5" style={{width: "100%"}}>
        { isLoadData ?
            (
              <Map data={data}/>
            ) : (
              <div>Empty map...</div>
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
