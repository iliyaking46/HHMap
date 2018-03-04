import React, { Component } from 'react';
import MetroSelectBox from './components/MetroSelectBox';
import TextBox from './components/TextBox';
import Button from './components/Button';
import JobsTable from './components/JobsTable';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      metro: [], //тут хранятся все линии, а в них станции (stations)
      data: [], //вакансии
      metroStationId: '', //хранится конкретная станция (поставил кутузувскую, там вакансии есть)
      text: 'react', //фраза для поиска
      isLoad: false,
      isLoadData: false,
      error: '',
    }
  }

  onFindJobs = () => {
    this.setState({ isLoadData: false });
    const perPage = 'per_page=10' //количество вакансий на странице
    const metro = +this.state.metroStationId ? 'metro='+this.state.metroStationId : '';
    const text = 'text='+this.state.text.split(' ').join('+');
    const addUrl = [perPage, metro, text].join('&')
    const baseUrl = 'https://api.hh.ru/vacancies?only_with_salary=true&'+addUrl;
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

  componentDidMount() {
    this.setState({ isLoad: false });
    const metroUrl = 'https://api.hh.ru/metro/1'
    fetch(`${metroUrl}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(metro => this.setState({ metro: metro.lines, isLoad: true }))
      .catch(error => this.setState({ error, isLoad: false }));
  }

  render() {
    const { metro, data, metroStationId, text, isLoad, isLoadData } = this.state

    if (!isLoad) return (<div>Loading...</div>) 
   
    return(
    <div className="container mt-5">
      <h1 className="text-center" >HH Map Jobs-Finder</h1>
      <div className="row">
        <div>
            <MetroSelectBox
              value={metroStationId}
              metro={metro}
              onChange={id => this.setState({metroStationId: id})}
            />
          </div>
          <div className="col">
            <TextBox
              onChange={(value) => this.setState({text: value})}
              value={text}
            />
          </div>
          <Button
            onClick={this.onFindJobs}
          >
          Поиск
          </Button>
      </div>
      <div className="row justify-content-center">
        { isLoadData ?
          (
            <JobsTable data={data}/>
          ) : (
            <div>Data is loading...</div>
          )
        }
      </div>
      
    </div>)
    
  }
}