import {
  ADD_GLOBAL_DATA
} from '../constants'

const initialState = {
  searchText: '',
  searchMetroId: '',
}


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_GLOBAL_DATA:
      return { searchText: payload.searchText, searchMetroId: payload.searchMetroId }

    default: return state;
  }
}