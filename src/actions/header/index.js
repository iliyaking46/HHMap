import {
  LOAD_METRO, CHANGE_SELECTION, CHANGE_SEARCHTEXT, START, SUCCESS, FAIL
} from '../../constants'

export function loadMetro() {
  return (dispatch) => {

    dispatch({
      type: LOAD_METRO + START,
      payload: { isLoad: false }
    })

    const metroUrl = 'https://api.hh.ru/metro/1'
    fetch(`${metroUrl}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(metro =>
        dispatch({
          type: LOAD_METRO + SUCCESS,
          payload: { metro: metro.lines, isLoad: true }
        })
      )
      .catch(error => {
        dispatch({
          type: LOAD_METRO + FAIL,
          payload: { error }
        })
      })
  }
}

export function changeSelection(selected) {
  return {
    type: CHANGE_SELECTION,
    payload: { selected }
  }
}

export function changeTextSearch(text) {
  return {
    type: CHANGE_SEARCHTEXT,
    payload: { text }
  }
}

