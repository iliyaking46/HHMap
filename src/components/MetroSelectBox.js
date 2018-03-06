import React from 'react';

export const MetroSelectBox =  (props) => {
  const { value, metro, onChange } = props;
  return (
    <select
      className="custom-select"
      value={value}
    >
      {
        metro.map(option => 
          <option value={option.value} key={option.value}>{option.label}</option>,
        )
      }
    </select>
  );
}
export default MetroSelectBox;
