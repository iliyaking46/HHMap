import React from 'react'
import { connect } from 'react-redux'
import { YMaps, Map, ObjectManager, Button } from 'react-yandex-maps'
// import { loader } from '../helpers'

import { loadMapData } from '../actions/map'
import { changePage } from '../actions/main'

class yaMap extends React.Component {
  componentDidMount() {
    this.props.changePage('map')
    const { searchText, searchMetroId } = this.props.app
    this.props.loadMapData(searchText, searchMetroId)
  }

  onLoadMap = event => {
    const coords = event.originalEvent.map.getBounds()
    const { searchText, searchMetroId } = this.props.app
    this.props.loadMapData(searchText, searchMetroId, coords)
  }

  render() {
    const { data, mapState } = this.props.map
    const ymapData = data
      .filter(item => item.address != null && item.address.lat != null && item.address.lng != null)
      .map(item => ({
        type: 'Feature',
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: [item.address.lat, item.address.lng],
        },
        properties: {
          balloonContentHeader: `<a href=/vacancies/${item.id} target=_blank>${item.name}</a>`,
          balloonContentBody: `${item.employer.name}<br><br><a href=/vacancies/${item.id} target=_blank>Подробнее</a>`,
          balloonContentFooter:
            (item.salary != null && (item.salary.from != null && `от ${item.salary.from}`)) || 'з/п не указана',
          clusterCaption: item.name,
          hintContent: item.name,
        },
        options: {
          preset: 'islands#blueCircleDotIconWithCaption',
          iconCaptionMaxWidth: '100',
        },
      }))
    return (
      <YMaps>
        <Map state={mapState} width="100%" height={500} onBoundsChange={this.onLoadMap}>
          <Button
            data={{ content: `Количество ваканский на карте ${ymapData.length}` }}
            options={{ float: 'right', maxWidth: '100%' }}
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
    )
  }
}
export default connect(
  state => ({
    app: state.app,
    map: state.ymap,
  }),
  { loadMapData, changePage }
)(yaMap)
