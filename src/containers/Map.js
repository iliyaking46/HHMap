import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
  // import placemarks from './placemark.json';

export const yaMap = ({data}) => {

  const mapState = { center: [55.76, 37.64], zoom: 10 };
  const ymapData = data.items
  .filter( item => {
    return item.address != null && item.address.lat != null && item.address.lng != null
  })
  .map(item => {
    return (
      {
        geometry: {
          coordinates: [item.address.lat, item.address.lng]
        },
        properties: {
          balloonContent: "<a href="+item.alternate_url+" target=_blank>"+item.name+"</a>"
        },
        options: {
          preset: "islands#icon",
          iconColor: "#0095b6"
        }
      }
    )
  })

  console.log(ymapData);

  return (
    <YMaps>
    <Map state={mapState}>
      {/* Creating a geo object with the "Point" geometry type. */}

      {ymapData.map((data, i) => {
        return(
          <Placemark
          key={i}
          {...data}
          />
        )
      })}

      {/* <GeoObject
        // The geometry description.
        geometry={{
          type: 'Point',
          coordinates: [55.670696, 37.47421],
        }}
        // Properties.
        properties={{
          // The placemark content.
          iconContent: 'Я тащусь',
          hintContent: 'Ну давай уже тащи',
        }}
        // Options.
        options={{
          // The placemark's icon will stretch to fit its contents.
          preset: 'islands#blackStretchyIcon',
          // The placemark can be moved.
          draggable: true,
        }}
      />

      <GeoObject
        // The geometry description.
        geometry={{
          type: 'Point',
          coordinates: [55.6, 37.6],
        }}
        // Properties.
        properties={{
          // The placemark content.
          iconContent: 'Я тащусь',
          hintContent: 'Ну давай уже тащи',
        }}
        // Options.
        options={{
          // The placemark's icon will stretch to fit its contents.
          preset: 'islands#blackStretchyIcon',
          // The placemark can be moved.
          draggable: true,
        }}
      /> */}

      {/* {placemarks.map((placemarkParams, i) =>
        <Placemark key={i} {...placemarkParams} />
      )} */}
    </Map>
  </YMaps>
  )
}

export default yaMap 
