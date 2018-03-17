import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import * as headerActions from '../actions/header';
import { addGlobalData } from '../actions/main';
import { loadMapData } from '../actions/map';
import { loadData } from '../actions/table';

class Header extends PureComponent {
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
  };

  componentDidMount() {
    this.props.loadMetro();
  }

  searchHandler = () => {
    const { searchText, metroId } = this.props.header;
    this.props.addGlobalData(metroId, searchText);
    this.props.history.push('/');
    switch (this.props.page) {
      case 'home':
        this.props.loadData(searchText, metroId);
        break;
      case 'map':
        this.props.loadMapData(searchText, metroId);
        break;
      default:
        break;
    }
  };

  render() {
    const { searchText, metroId, metro } = this.props.header;
    const stations = metro
      .map(line => [
        { label: line.name, value: line.id },
        ...line.stations.map(station => ({
          label: station.name,
          value: station.id,
        })),
      ])
      .reduce((newArr, nextArr) => [...newArr, ...nextArr], []);

    return (
      <div className="row">
        <div className="col-md-3 mb-3">
          <Select
            options={stations}
            value={metroId}
            simpleValue
            placeholder={'Выберите станцию'}
            noResultsText={'Ты где такие станции нашел?'}
            onChange={selected => this.props.changeSelection(selected)}
          />
        </div>
        <div className="col-md mb-3">
          <TextBox
            onChange={text => this.props.changeTextSearch(text)}
            onKeyDown={enter => enter && this.searchHandler()}
            value={searchText}
          />
        </div>
        <div className="col col-md-auto mb-3 text-center">
          <Button className="mb-3" onClick={this.searchHandler}>
            Поиск
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.header,
    page: state.app.currentPage,
  }),
  { addGlobalData, ...headerActions, loadData, loadMapData },
)(Header);
