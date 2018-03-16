import React from 'react'
import pure from 'recompose/pure'
import { Provider } from 'react-redux'
import configureStore from 'store'
import App from './App'

const Root = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
)

export default pure(Root)
