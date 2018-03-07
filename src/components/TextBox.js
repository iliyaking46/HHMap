import React from 'react';

export const TextBox = (props) => {
  const { onChange, onKeyDown, value='' } = props;
  return (
    <input
      autoFocus
      className="form-control"
      placeholder="Введите значение"
      type="text"
      value={value}
      onKeyDown={e => onKeyDown(e.key === 'Enter')}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default TextBox;
