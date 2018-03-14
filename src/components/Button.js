import React from 'react'
import pure from 'recompose/pure'

export const Button = ({ onClick, children }) => (
  <button className="btn btn-primary mx-3" onClick={onClick}>
    {children}
  </button>
)

export default pure(Button)
