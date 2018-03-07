import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import TextBox from '../components/TextBox';
import Button from '../components/Button';

import 'react-select/dist/react-select.css'
import * as headerActions from '../actions/header'
import { loadData } from '../actions/main'


class Header extends Component {

  componentDidMount() {
    console.log(this.props);
    this.props.loadMetro();
  }

  handleSubmit = (e, metroId, searchText) => this.props.loadData(metroId, searchText)

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
              onChange={selected => this.props.changeSelection(selected)}
            />
          </div>
          <div className="col">
            <TextBox
              onChange={text => this.props.changeTextSearch(text)}
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

export default connect(state => ({
  header: state.header,
}), {loadData, ...headerActions} )(Header)
