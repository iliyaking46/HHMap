import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import * as headerActions from '../actions/header'
import { addGlobalData } from '../actions/main'
import { loadMapData } from '../actions/map'
import { loadData } from '../actions/table'

class Header extends Component {
  static propTypes = {
    loadMetro: PropTypes.func.isRequired,
    addGlobalData: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    loadMapData: PropTypes.func.isRequired,
    changeSelection: PropTypes.func.isRequired,
    changeTextSearch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    header: PropTypes.objectOf(PropTypes.any).isRequired,
    page: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.loadMetro()
  }

  searchHandler = () => {
    const { searchText, metroId } = this.props.header
    this.props.addGlobalData(metroId, searchText)
    this.props.history.push('/')
    // console.log(this.props.page);

    switch (this.props.page) {
      case 'home':
        this.props.loadData(searchText, metroId)
        break
      case 'map':
        this.props.loadMapData(searchText, metroId)
        break
      default:
        break
    }
  }

  // handleSubmit = (e, metroId, searchText) => this.props.loadData(metroId, searchText) // Оно не используется

  render() {
    const { searchText, metroId, metro } = this.props.header
    const stations = metro
      .map(line => [
        { label: line.name, value: line.id },
        ...line.stations.map(station => ({
          label: station.name,
          value: station.id,
        })),
      ])
      .reduce((newArr, nextArr) => [...newArr, ...nextArr], [])

    return (
      <div className="row">
        <div className="col-3">
          <Select
            options={stations}
            value={metroId}
            simpleValue
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
        <Button onClick={this.searchHandler}>Поиск</Button>
      </div>
    )
  }
}

export default connect(
  state => ({
    header: state.header,
    page: state.app.currentPage,
  }),
  { addGlobalData, ...headerActions, loadData, loadMapData }
)(Header)
