
import React from 'react';
import { YMaps, Map, ObjectManager, Button } from 'react-yandex-maps';
// import { Link } from "react-router-dom";

export const yaMap = ({data}) => {

  const mapState = { center: [55.76, 37.64], zoom: 10 };
  const ymapData = data
  .filter( item => {
    return item.address != null && item.address.lat != null && item.address.lng != null
  })
  .map(item => {
    return (
      {
        type: "Feature",
        id: item.id,
        geometry: {
          type: "Point",
          coordinates: [item.address.lat, item.address.lng]
        },
        properties:{
          balloonContentHeader: item.name,
          balloonContentBody: item.employer.name,
          balloonContentFooter:(item.salary != null && item.salary.from != null &&  "от "+item.salary.from ) || "з/п не указана" ,
          clusterCaption: item.name,
          hintContent: item.name
        },
        options: {
          preset: "islands#blueCircleDotIconWithCaption",
          iconCaptionMaxWidth: "100"
        }
      }
    )
  })

  return (
    <YMaps>
      <Map state={mapState} width={'100%'} height={500}>
        <Button data={{ content: "Количество ваканский на карте " + ymapData.length }} options={{ float: 'right', maxWidth: '100%' }} />
        <ObjectManager
          options={{
            clusterize: true,
            gridSize: 120,
          }}
          objects={{
            preset: 'islands#blueDotIcon',
          }}
          clusters={{
            preset: 'islands#blueClusterIcons',
          }}
          features={ymapData}
        />
        {/* {ymapData.map((data, i) => {
          return(
            <Placemark
            key={i}
            {...data}
            />
          )
        })} */   }
      </Map>
    </YMaps>
  )
}

export default yaMap 

/*
import React from 'react';
import { YMaps, Map, ObjectManager, Button } from 'react-yandex-maps';
// import { Link } from "react-router-dom";

class yaMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapState: { center: [55.76, 37.64], zoom: 10 },
      data: props.data,
    }
  }
  onLoadMap = (coords) => {
    const url = `https://api.hh.ru/vacancies?area=1&per_page=50&clusters=true&label=with_address&top_lat=${coords[1][0]}&bottom_lat=${coords[0][0]}&left_lng=${coords[0][1]}&right_lng=${coords[1][1]}`
    console.log(url);    
    fetch(url)
    .then(response => response.json())
    .then(response => this.setState({ data: response.items }))
  }
  render() {
    const { data, mapState } = this.state;
    const ymapData = data
      .filter(item => {
        return item.address != null && item.address.lat != null && item.address.lng != null
      })
      .map(item => {
        return (
          {
            type: "Feature",
            id: item.id,
            geometry: {
              type: "Point",
              coordinates: [item.address.lat, item.address.lng]
            },
            properties: {
              balloonContentHeader: item.name,
              balloonContentBody: item.employer.name,
              balloonContentFooter: (item.salary != null && item.salary.from != null && "от " + item.salary.from) || "з/п не указана",
              clusterCaption: item.name,
              hintContent: item.name
            },
            options: {
              preset: "islands#blueCircleDotIconWithCaption",
              iconCaptionMaxWidth: "100"
            }
          }
        )
      })
    return (
      <YMaps>
        <Map state={mapState} width='100%' height={500}
          instanceRef={ref => ref != null && ref.events.add('actionend', () => this.onLoadMap(ref.getBounds()))}
        >
          <Button data={{ content: "Количество ваканский на карте " + ymapData.length }} options={{ float: 'right', maxWidth: '100%' }} />
          <ObjectManager
            options={{
              clusterize: false,
              gridSize: 0,
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
      </YMaps >
    )
  }
}
export default yaMap 
*/