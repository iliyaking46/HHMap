import React from 'react';
import { YMaps, Map, ObjectManager, Button } from 'react-yandex-maps';

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
          balloonContentHeader: `<a href=${item.alternate_url} target=_blank>${item.name}</a>`,
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
        })} */}
      </Map>
    </YMaps>
  )
}

export default yaMap 
