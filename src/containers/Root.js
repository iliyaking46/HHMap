import React from 'react'
import {Provider} from 'react-redux'
// import PropTypes from 'prop-types'
import App from './App'
import store from '../store'

function Root() {
    return (
        <Provider store = {store}>
            <App />
        </Provider>
    )
}

// Root.propTypes = {
// }

export default Root