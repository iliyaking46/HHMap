import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

const Button = ({ onClick, children }) => (
  <button className="btn btn-primary mx-3" onClick={onClick}>
    {children}
  </button>
)
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}
export default pure(Button)
