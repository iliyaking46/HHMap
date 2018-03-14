import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import TextBox from '../components/TextBox';
import 'react-select/dist/react-select.css'
import * as headerActions from '../actions/header'
import { addGlobalData } from '../actions/main'
import { loadMapData } from '../actions/map'
import { loadData } from '../actions/table'

class Header extends Component {
  componentDidMount() {
    this.props.loadMetro();
  }

  searchHandler = () => {
    const { searchText, metroId } = this.props.header;
    this.props.addGlobalData(metroId, searchText);
    this.props.history.push('/');
    console.log(this.props.page);

    switch (this.props.page) {
      case 'home': this.props.loadData(searchText, metroId); break;
      case 'map': this.props.loadMapData(searchText, metroId); break;
      default: break;
    }
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
            onKeyDown={enter => enter && this.searchHandler()}
            value={searchText}
          />
        </div>
        <button className="btn btn-primary mx-3" onClick={this.searchHandler}>Поиск</button>
      </div>
    )
  }
}

export default connect(state => ({
  header: state.header,
  page: state.app.currentPage,
}), { addGlobalData, ...headerActions, loadData, loadMapData })(Header)
