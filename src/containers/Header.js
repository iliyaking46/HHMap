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
    if (!this.props.header.get('metro').size) {
      this.props.loadMetro();
    }
  }

  searchHandler = event => {
    event.target.blur();
    const { header } = this.props;
    const searchText = header.get('searchText');
    const metroId = header.get('metroId');

    this.props.addGlobalData(metroId, searchText);
    this.props.history.push('/vacancies');

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
    const { header } = this.props;
    const searchText = header.get('searchText');
    const metroId = header.get('metroId');
    const metro = header.get('metro');

    const stations = [];
    /* eslint-disable */
    for (const line of metro) {
      stations.push({ label: line.get('name'), value: line.get('id') });
      for (const station of line.get('stations')) {
        stations.push({ label: station.get('name'), value: station.get('id') });
      }
    }
    /* eslint-enable */

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
            onKeyDown={event =>
              event.key === 'Enter' && this.searchHandler(event)
            }
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
    header: state.get('header'),
    page: state.getIn(['app', 'currentPage']),
  }),
  { addGlobalData, ...headerActions, loadData, loadMapData },
)(Header);
