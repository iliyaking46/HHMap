import React, { useEffect, useState } from 'react';
import { YMaps, Map, ObjectManager } from '@pbe/react-yandex-maps';
import { useLocation } from 'react-router-dom';
import { loadMapData } from '../reducer/ymap';
import { VacancyItem } from '../reducer/table';
import { useAppDispatch, useAppSelector } from '../common/hooks';

const initialMapState = {
  center: [55.76, 37.64],
  zoom: 10,
  controls: [
    'zoomControl',
    'fullscreenControl',
  ],
};

type Props = {
  data?: VacancyItem[]
}

const YaMap = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const generalData = useAppSelector((state) => state.ymap.data);
  const currentSearch = React.useMemo(() => new URLSearchParams(location.search).toString(), [location.search]);

  const [mapState, setMapState] = useState(initialMapState);

  useEffect(() => {
    if (data) {
      const coords = [
        Number(data[0].address!.lat),
        Number(data[0].address!.lng),
      ];
      setMapState({ ...initialMapState, center: [...coords], zoom: 15 });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!data) {
      setMapState(initialMapState);
      dispatch(loadMapData({ params: currentSearch }));
    }
  }, [dispatch, currentSearch, data]);

  const onBoundsChange = (event: { get: (arg0: string) => any; }) => {
    if (data) return;
    const params = currentSearch!;
    const mapInstance = event.get('map');
    const coords = mapInstance.getBounds();
    // const center = mapInstance.getCenter();
    // const zoom = mapInstance.getZoom();
    dispatch(loadMapData({ params, coords }));
  };

  const ymapData = (data || generalData)
  .filter((item) => item.address?.lat && item.address?.lng)
  .map((item) => ({
    type: 'Feature',
    id: item.id,
    geometry: {
      type: 'Point',
      coordinates: [item.address?.lat, item.address?.lng],
    },
    properties: {
      balloonContentHeader: `
          <a href="/vacancy/${item.id}">
            ${item.name}
          </a>
        `,
      balloonContentBody: `
          ${item.employer?.name}
          <br><br>
          <a href="/vacancy/${item.id}"
             target=_blank>
            Подробнее
          </a>
        `,
      balloonContentFooter: item.salary
        ? item.salary?.from && `от ${item.salary?.from}`
        : 'з/п не указана',
      clusterCaption: item.name,
      hintContent: item.name,
    },
    options: {
      preset: 'islands#blueCircleDotIconWithCaption',
      iconCaptionMaxWidth: '100',
    },
  }));

  return (
    <div className="my-3">
      <YMaps
        query={{
          load: 'package.standard',
        }}>
        <Map
          state={mapState}
          width="100%"
          height={500}
          onBoundsChange={onBoundsChange}
        >
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
    </div>
  );
};

export default YaMap;