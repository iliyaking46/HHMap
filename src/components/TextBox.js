import React from 'react';

export const TextBox = (props) => {
  const onChange = props.onChange;
  const value = props.value || '';
  return (
    <input
      autoFocus
      className="form-control"
      placeholder="Введите значение"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default TextBox;
