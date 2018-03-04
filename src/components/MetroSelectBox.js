import React from 'react';

export const MetroSelectBox =  (props) => {
  const { value, metro, onChange } = props;
  return (
    <select
      className="custom-select"
      value={value}
      onChange={e => {onChange(e.target.value)}}
    >
      {metro.map(line => {
        return (
        <optgroup label={line.name} key={line.id} style={{color: '#'+line.hex_color}}>
          {line.stations.map(station => {
            return (
              <option key={station.id} value={station.id} style={{ color: '#000' }}>
                {station.name}
              </option>
            )
          })}
        </optgroup>
        )
      })
      }
    </select>
  );
}
export default MetroSelectBox;
