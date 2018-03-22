import {
  LOAD_MAP_DATA,
  START,
  SUCCESS,
  FAIL,
  CHANGE_YMAP_STATE,
} from '../../constants';

export function updateYAMapState(center, zoom) {
  return {
    type: CHANGE_YMAP_STATE,
    payload: { center, zoom },
  };
}

export function loadMapData(params, coords) {
  return dispatch => {
    dispatch({
      type: LOAD_MAP_DATA + START,
      payload: { isLoadData: false },
    });
    const urlParams = params || '?';
    const topLatQuery = coords ? `&top_lat=${coords[1][0]}` : '';
    const bottomLatQuery = coords ? `&bottom_lat=${coords[0][0]}` : '';
    const leftLngQuery = coords ? `&left_lng=${coords[0][1]}` : '';
    const rightLngQuery = coords ? `&right_lng=${coords[1][1]}` : '';
    const baseUrl = `https://api.hh.ru/vacancies${urlParams}&area=1&per_page=100${topLatQuery}${bottomLatQuery}${leftLngQuery}${rightLngQuery}`;
    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(data =>
        dispatch({
          type: LOAD_MAP_DATA + SUCCESS,
          payload: { data: data.items, isLoadData: true },
        }),
      )
      .catch(error =>
        dispatch({
          type: LOAD_MAP_DATA + FAIL,
          payload: { error },
        }),
      );
  };
}
