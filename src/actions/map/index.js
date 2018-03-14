import {
  LOAD_MAP_DATA, START, SUCCESS, FAIL
} from '../../constants'

export function loadMapData(searchText, searchMetroId, coords) {
  return (dispatch) => {
    
    dispatch({
      type: LOAD_MAP_DATA + START,
      payload: { isLoadData: false }
    })

    const metro = searchMetroId ? '&metro=' + searchMetroId : '';
    const text = searchText ? `&text=${searchText.split(' ').join('+')}` : '';
    const topLatQuery = coords ? `&top_lat=${coords[1][0]}` : ''
    const bottomLatQuery = coords ? `&bottom_lat=${coords[0][0]}` : ''
    const leftLngQuery = coords ? `&left_lng=${coords[0][1]}` : ''
    const rightLngQuery = coords ? `&right_lng=${coords[1][1]}` : ''
    const baseUrl = `https://api.hh.ru/vacancies?area=1&per_page=100${text}${metro}${topLatQuery}${bottomLatQuery}${leftLngQuery}${rightLngQuery}`;
    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        return dispatch({
          type: LOAD_MAP_DATA + SUCCESS,
          payload: { data: data.items, isLoadData: true }
        })
      })
      .catch(error => {
        return dispatch({
          type: LOAD_MAP_DATA + FAIL,
          payload: { error }
        })
      })
  }
}