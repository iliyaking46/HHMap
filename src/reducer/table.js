import {
  LOAD_DATA,
  START,
  SUCCESS,
  FAIL
} from '../constants'

const initialState = {
  data: [], //вакансии
  isLoadData: true,
  paramOfData: {
    found: '',
    page: 0,
    pages: 0,
    address: ''
  }
}


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_DATA + START:
      return { ...state, data: payload.data, isLoadData: payload.isLoadData }

    case LOAD_DATA + SUCCESS:
      let xc = {}
      xc.found = payload.paramOfData.found
      xc.page = payload.paramOfData.page + 1
      xc.pages = payload.paramOfData.pages
      xc.address = payload.paramOfData.address
      return { data: [...state.data, ...payload.data], isLoadData: payload.isLoadData, paramOfData: xc }

    case LOAD_DATA + FAIL:
      return { ...state, isLoad: false, paramOfData: 0 }

    default: return state;
  }
}