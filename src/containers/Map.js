import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, ObjectManager, Button } from 'react-yandex-maps';
import PropTypes from 'prop-types';

import { loadMapData } from '../actions/map';
import { changePage } from '../actions/main';

class yaMap extends PureComponent {
  static propTypes = {
    app: PropTypes.objectOf(PropTypes.any).isRequired,
    map: PropTypes.objectOf(PropTypes.any).isRequired,
    // eslint-disable-next-line
    data: PropTypes.arrayOf(PropTypes.any),
    changePage: PropTypes.func.isRequired,
    loadMapData: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (!this.props.data) {
      this.props.changePage('map');
      const { searchText, searchMetroId } = this.props.app;
      this.props.loadMapData(searchText, searchMetroId);
    }
  }

  onLoadMap = event => {
    const coords = event.originalEvent.map.getBounds();
    const { searchText, searchMetroId } = this.props.app;
    this.props.loadMapData(searchText, searchMetroId, coords);
  };

  render() {
    const { mapState } = this.props.map;
    let data;
    if (this.props.data) {
      data = this.props.data;
    } else {
      data = this.props.map.data;
    }
    const ymapData = data
      .filter(
        item =>
          item.address != null &&
          item.address.lat != null &&
          item.address.lng != null,
      )
      .map(item => ({
        type: 'Feature',
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: [item.address.lat, item.address.lng],
        },
        properties: {
          balloonContentHeader: `<a href=/vacancies/${item.id} target=_blank>${
            item.name
          }</a>`,
          balloonContentBody: `${
            item.employer.name
          }<br><br><a href=/vacancies/${item.id} target=_blank>Подробнее</a>`,
          balloonContentFooter:
            (item.salary != null &&
              (item.salary.from != null && `от ${item.salary.from}`)) ||
            'з/п не указана',
          clusterCaption: item.name,
          hintContent: item.name,
        },
        options: {
          preset: 'islands#blueCircleDotIconWithCaption',
          iconCaptionMaxWidth: '100',
        },
      }));
    return (
      <YMaps>
        <Map
          state={mapState}
          width="100%"
          height={500}
          onBoundsChange={this.onLoadMap}
        >
          <Button
            data={{
              content: `Количество ваканский на карте ${ymapData.length}`,
            }}
            options={{ margin: 'auto', maxWidth: '600' }}
          />
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              preset: 'islands#blueDotIcon',
            }}
            clusters={{
              preset: 'islands#blueClusterIcons',
            }}
            features={ymapData}
          />
        </Map>
      </YMaps>
    );
  }
}
export default connect(
  state => ({
    app: state.app,
    map: state.ymap,
  }),
  { loadMapData, changePage },
)(yaMap);
