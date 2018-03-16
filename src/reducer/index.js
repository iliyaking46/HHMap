import { combineReducers } from 'redux'
import app from './app'
import header from './header'
import table from './table'
import ymap from './ymap'
import vacancyCard from './vacancyCard'

export default combineReducers({
  app,
  header,
  table,
  ymap,
  vacancyCard,
})
