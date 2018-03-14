import React from 'react'
import pure from 'recompose/pure'
import { Provider } from 'react-redux'
import configureStore from 'store'
import App from './App'
// import PropTypes from 'prop-types'

const Root = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
)

// Root.propTypes = {
// }

export default pure(Root)
