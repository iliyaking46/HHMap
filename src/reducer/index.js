import {combineReducers} from 'redux';
import app from './app';
import header from './header';

export default combineReducers({
  app, header,
})