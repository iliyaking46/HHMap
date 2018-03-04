import React from 'react';

export const MetroSelectBox =  (props) => {
  const { value, metro, onChange } = props;
  return (
    <select
      className="custom-select"
      value={value}
      onChange={e => {onChange(e.target.value)}}
    >
      {metro.sort( (a, b) => a.name > b.name ? 1 : -1 ).map(line => {
        return ([
          <option value={0} key={0}>Выберете станцию</option>,
          <option value={line.id} key={line.id} style={{color: '#'+line.hex_color}}>{line.name}</option>,
          line.stations.sort( (a,b) => a.name > b.name ? 1 : -1 ).map(station => (
            <option key={station.id} value={station.id} className="ml-2" >
              {station.name}
            </option>
          ))
        ])
      })
      }
    </select>
  );
}
export default MetroSelectBox;
