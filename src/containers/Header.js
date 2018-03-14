import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import TextBox from '../components/TextBox';
import { Link } from "react-router-dom";

import 'react-select/dist/react-select.css'
import * as headerActions from '../actions/header'
import { addGlobalData } from '../actions/main'

class Header extends Component {
  componentDidMount() {
    this.props.loadMetro();
  }

  // handleSubmit = (e, metroId, searchText) => this.props.loadData(metroId, searchText) // Оно не используется

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
            onKeyDown={enter => enter && this.props.addGlobalData(metroId, searchText)} // 49-я и 53-я строки делают одно и тоже
            value={searchText}
          />
        </div>
        <Link to="/vacancies" className="btn btn-primary mx-3" onClick={() => this.props.addGlobalData(metroId, searchText)}>Поиск</Link>
        {/* <Button
            onClick={() => this.props.loadData(metroId, searchText)}
          >
            Поиск
          </Button> */}
      </div>
    )
  }
}

export default connect(state => ({
  header: state.header,
}), { addGlobalData, ...headerActions })(Header)
