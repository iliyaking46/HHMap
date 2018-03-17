import {
  LOAD_METRO,
  CHANGE_SELECTION,
  CHANGE_SEARCHTEXT,
  START,
  SUCCESS,
  FAIL,
} from '../constants';

const initialState = {
  searchText: '',
  metroId: '',
  metro: [],
  isLoad: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_METRO + START:
      return { ...state, isLoad: payload.isLoad };

    case LOAD_METRO + SUCCESS:
      return {
        ...state,
        metroId: payload.metro[3].id,
        metro: payload.metro,
        isLoad: payload.isLoad,
      };

    case LOAD_METRO + FAIL:
      return { ...state, isLoad: false };

    case CHANGE_SELECTION:
      return { ...state, metroId: payload.selected };

    case CHANGE_SEARCHTEXT:
      return { ...state, searchText: payload.text };

    default:
      return state;
  }
};
