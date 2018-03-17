import {
  LOAD_TABLE_DATA,
  LOAD_PAGE_TABLE_DATA,
  CHANGE_VACANCIES_PAGE,
  START,
  SUCCESS,
  FAIL,
} from '../constants';

const initialState = {
  data: [],
  isLoadData: false,
  isLoad: true,
  found: '',
  page: 0,
  pages: 0,
  address: '',
  searchText: '',
  searchMetroId: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_TABLE_DATA + START:
      return {
        ...state,
        data: payload.data,
        isLoad: payload.isLoad,
        isLoadData: payload.isLoadData,
      };

    case LOAD_TABLE_DATA + SUCCESS:
      return {
        data: [
          {
            items: payload.data,
            page: payload.page,
          },
        ],
        isLoad: payload.isLoad,
        isLoadData: payload.isLoadData,
        found: payload.found,
        page: payload.page,
        pages: payload.pages,
        address: payload.address,
        searchText: payload.searchText,
        searchMetroId: payload.searchMetroId,
      };

    case LOAD_TABLE_DATA + FAIL:
      return { ...state, isLoad: false };

    // Reducer for adding page

    case LOAD_PAGE_TABLE_DATA + START:
      return {
        ...state,
        isLoad: payload.isLoad,
      };

    case LOAD_PAGE_TABLE_DATA + SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          {
            items: payload.data,
            page: payload.page,
          },
        ],
        page: payload.page,
        isLoad: payload.isLoad,
      };

    case LOAD_PAGE_TABLE_DATA + FAIL:
      return { ...state, isLoad: false };

    case CHANGE_VACANCIES_PAGE:
      return { ...state, page: payload.page };

    default:
      return state;
  }
};
