import {
  ADD_GLOBAL_DATA,
  CHANGE_PAGE
} from '../../constants'

export function addGlobalData( searchMetroId, searchText ) {
  return {
      type: ADD_GLOBAL_DATA,
      payload: { searchMetroId, searchText }
  }
}

export function changePage( page ) {
  return {
      type: CHANGE_PAGE,
      payload: { page }
  }
}