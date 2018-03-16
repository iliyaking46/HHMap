import { LOAD_TABLE_DATA, START, SUCCESS, FAIL } from '../constants';

const initialState = {
  data: [],
  isLoadData: true,
  paramOfData: {
    found: '',
    page: 0,
    pages: 0,
    address: '',
    searchText: '',
    searchMetroId: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_TABLE_DATA + START:
      return { ...state, data: payload.data, isLoadData: payload.isLoadData };

    case LOAD_TABLE_DATA + SUCCESS:
      // const params = {
      //   found: payload.paramOfData.found,
      //   page: payload.paramOfData.page + 1,
      //   pages: payload.paramOfData.pages,
      //   address: payload.paramOfData.address,
      //   searchText: payload.paramOfData.searchText,
      //   searchMetroId: payload.paramOfData.searchMetroId
      // }
      return {
        data: [...state.data, ...payload.data],
        isLoadData: payload.isLoadData,
        paramOfData: {
          ...state.paramOfData,
          found: payload.paramOfData.found,
          page: payload.paramOfData.page + 1,
          pages: payload.paramOfData.pages,
          address: payload.paramOfData.address,
          searchText: payload.paramOfData.searchText,
          searchMetroId: payload.paramOfData.searchMetroId,
        },
      };

    case LOAD_TABLE_DATA + FAIL:
      return { ...state, isLoad: false, paramOfData: 0 };

    default:
      return state;
  }
};
