import React from 'react';

export const Button = (props) => {
  const {onClick, children} = props;
  return (
    <button className="btn btn-primary mx-3" onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
