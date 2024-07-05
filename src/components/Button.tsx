import React from 'react';

type Props = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, children, className }) => (
  <button className={'btn btn-outline-dark ' + className || ''} onClick={onClick}>
    {children}
  </button>
);

export default Button;
