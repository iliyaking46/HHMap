import { combineReducers } from 'redux-immutable';
import app from './app';
import header from './header';
import table from './table';
import { ymap, mapState } from './ymap';
import vacancyCard from './vacancyCard';

export default combineReducers({
  app,
  header,
  table,
  ymap,
  mapState,
  vacancyCard,
});
