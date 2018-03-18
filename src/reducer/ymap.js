import { fromJS } from 'immutable';
import {
  LOAD_MAP_DATA,
  START,
  SUCCESS,
  FAIL,
  CHANGE_YMAP_STATE,
} from '../constants';

const initialMapData = fromJS({
  data: [],
  isLoadData: true,
});

export const ymap = (state = initialMapData, { type, payload }) => {
  switch (type) {
    case LOAD_MAP_DATA + START:
      return state.setIn(['isLoadData'], payload.isLoadData);

    case LOAD_MAP_DATA + SUCCESS:
      return state
        .setIn(['data'], fromJS(payload.data))
        .setIn(['isLoadData'], payload.isLoadData);

    case LOAD_MAP_DATA + FAIL:
      return state.setIn(['isLoad'], payload.isLoadData);

    default:
      return state;
  }
};

const initialMapState = fromJS({
  center: [55.76, 37.64],
  zoom: 10,
  controls: [],
});

export const mapState = (state = initialMapState, { type, payload }) => {
  switch (type) {
    case CHANGE_YMAP_STATE:
      return state
        .setIn(['center'], payload.center)
        .setIn(['zoom'], payload.zoom);
    // .setIn(['mapState'], payload)
    default:
      return state;
  }
};
