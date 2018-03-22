import { combineReducers } from 'redux-immutable';
import header from './header';
import table from './table';
import { ymap, mapState } from './ymap';
import vacancyCard from './vacancyCard';

export default combineReducers({
  header,
  table,
  ymap,
  mapState,
  vacancyCard,
});
