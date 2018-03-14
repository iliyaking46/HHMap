import {
  ADD_GLOBAL_DATA
} from '../../constants'

export function addGlobalData( searchMetroId, searchText ) {
  return {
      type: ADD_GLOBAL_DATA,
      payload: { searchMetroId, searchText }
  }
}