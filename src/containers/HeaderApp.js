import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import TextBox from '../components/TextBox';
import Button from '../components/Button';

import 'react-select/dist/react-select.css'

import { loadMetro, changeSelection, changeTextSearch } from '../AC'


class HeaderApp extends Component {

  componentDidMount() {
    this.props.loadMetro()
  }
  render () {

    const { searchText, metroId, metro, isLoad } = this.props.searchField;
    const stations = metro.map(line => 
        [{label: line.name,value: line.id}, ...line.stations.map(station => (
          {
            label: station.name,
            value: station.id
          }
        ))]
    ).reduce((newArr, nextArr) => [...newArr, ...nextArr], [])

    return (
      <div className="row">
          <div className="col-3" >
            <Select
              options={stations}
              value={metroId}
              multi={false}
              onChange={selected => this.props.changeSelection(selected)}
            />
          </div>
          <div className="col">
            <TextBox
              onChange={text => this.props.changeTextSearch(text)}
              value={searchText}
            />
          </div>
          <Button
            onClick={() => console.log(metroId, searchText)}
          >
          Загрузить станции
          </Button> 
        </div>
    )
  }
}
export default connect(state => ({
  searchField: state.search,
}), { loadMetro, changeSelection, changeTextSearch })(HeaderApp)
