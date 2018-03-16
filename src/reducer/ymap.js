import { LOAD_MAP_DATA, START, SUCCESS, FAIL } from '../constants';

const initialState = {
  data: [],
  mapState: { center: [55.76, 37.64], zoom: 10, controls: [] },
  isLoadData: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_MAP_DATA + START:
      return { ...state, isLoadData: payload.isLoadData };

    case LOAD_MAP_DATA + SUCCESS:
      return { ...state, data: payload.data, isLoadData: payload.isLoadData };

    case LOAD_MAP_DATA + FAIL:
      return { ...state, isLoad: false };

    default:
      return state;
  }
};
