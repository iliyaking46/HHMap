import React from 'react';

export const TextBox = (props) => {
  const onChange = props.onChange;
  const value = props.value || '';
  return (
    <input
      className="form-control"
      placeholder="Enter value"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default TextBox;
