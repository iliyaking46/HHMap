import { fromJS } from 'immutable';
import { ADD_GLOBAL_DATA, CHANGE_PAGE } from '../constants';

const initialState = fromJS({
  searchText: '',
  searchMetroId: '',
  currentPage: 'home',
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_GLOBAL_DATA:
      return state
        .setIn(['searchText'], payload.searchText)
        .setIn(['searchMetroId'], payload.searchMetroId);

    case CHANGE_PAGE:
      return state.setIn(['currentPage'], payload.page);

    default:
      return state;
  }
};
