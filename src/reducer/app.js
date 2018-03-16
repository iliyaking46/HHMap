import { ADD_GLOBAL_DATA, CHANGE_PAGE } from '../constants';

const initialState = {
  searchText: '',
  searchMetroId: '',
  currentPage: 'home',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_GLOBAL_DATA:
      return {
        ...state,
        searchText: payload.searchText,
        searchMetroId: payload.searchMetroId,
      };

    case CHANGE_PAGE:
      return { ...state, currentPage: payload.page };

    default:
      return state;
  }
};
