import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import * as headerActions from '../actions/header';
import { loadData } from '../actions/table';
import { parseQuery } from "../helpers";

class Header extends PureComponent {
  static propTypes = {
    loadMetro: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    changeSelection: PropTypes.func.isRequired,
    changeTextSearch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any),
    header: PropTypes.objectOf(PropTypes.any),
  };

  componentDidMount() {
    if (!this.props.header.get('metro').size) {
      this.props.loadMetro();
    }
    const { history: {history}, changeSelection, changeTextSearch } = this.props;
    const {metro, text} = parseQuery(history.location.search);
    metro && changeSelection(metro);
    text && changeTextSearch(text);
  }

  searchHandler = event => {
    event.target.blur();
    const { header, history: {history}, loadData } = this.props;
    const searchText = header.get('searchText');
    const metroId = header.get('metroId');
    const paramsUrl = `?${searchText ? `text=${searchText.split(' ').join('+')}&` : ``}${metroId ? `metro=${metroId}` : ``}`;
    if (history.location.search !== paramsUrl) {
      // loadData(paramsUrl, () => history.push(`/vacancies${paramsUrl}`))
      history.push(`/vacancies${paramsUrl}`);
      loadData(paramsUrl);
    }
  };

  pushRoot = () => {
    const {
      location: {pathname},
      history: {push}
    } = this.props.history;
    if (pathname !== '') {
      push('/')
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
      <div className="container">
        <h2 className="text-center py-2 py-md-4 main-heading" onClick={this.pushRoot}>
          Найди работу своей мечты
        </h2>
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
          <div className="col col-md-auto text-center">
            <Button className="mb-3" onClick={this.searchHandler}>
              Поиск
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.get('header'),
  }),
  { ...headerActions, loadData },
)(Header);
