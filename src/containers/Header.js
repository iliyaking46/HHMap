import React, { Component } from 'react';
import Select from 'react-select'
import TextBox from '../components/TextBox';
import Button from '../components/Button';

import 'react-select/dist/react-select.css'


export default class Header extends Component {

  handleSubmit = (e, metroId, searchText) => {e.preventDefault(); this.props.loadData(metroId, searchText)}

  render() {
    const { searchText, metroId, metro } = this.props.header;

    const stations = metro.map(line =>
      [{ label: line.name, value: line.id }, ...line.stations.map(station => (
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
              simpleValue={true}
              placeholder={'Выберите станцию'}
              noResultsText={'Ты где такие станции нашел?'}
              onChange={selected => this.props.action.changeSelection(selected)}
            />
          </div>
          <div className="col">
            <TextBox
              onChange={text => this.props.action.changeTextSearch(text)}
              onKeyDown={enter => enter && this.props.loadData(metroId, searchText)}
              value={searchText}
            />
          </div>
          <Button
            onClick={() => this.props.loadData(metroId, searchText)}
          >
            Поиск
          </Button>
        </div>

    )
  }
}