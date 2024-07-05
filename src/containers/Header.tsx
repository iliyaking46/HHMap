import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { IDLE_STATUS } from '../common/constants';
import { loadMetro, MetroStationItem } from '../reducer/header';
import TextBox from '../components/TextBox';
import Button from '../components/Button';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { metroList, status: metroListStatus } = useAppSelector((state) => state.header);

  const [searchTextValue, setSearchTextValue] = useState<string>(() => new URLSearchParams(location.search).get('text') || '');
  const [searchMetroStationValue, setSearchMetroStationValue] = useState<string | null>(() => new URLSearchParams(location.search).get('metro'));

  useEffect(() => {
    if (metroListStatus === IDLE_STATUS) {
      dispatch(loadMetro());
    }
  }, [dispatch, metroList, metroListStatus]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.currentTarget.blur();
    handleSubmit();
  };

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams();
    if (searchTextValue) newSearchParams.set('text', searchTextValue);
    if (searchMetroStationValue) newSearchParams.set('metro', searchMetroStationValue);

    navigate({ pathname: 'vacancies', search: newSearchParams.toString() });
  };

  const pushRoot = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const stations: MetroStationItem[] = React.useMemo(() => {
    const temp: MetroStationItem[] = [];
    for (const line of metroList) {
      temp.push({ label: line.name, value: line.id });
      for (const station of line.stations) {
        temp.push({ label: station.name, value: station.id });
      }
    }
    return temp;
  }, [metroList]);


  return (
    <div className="container">
      <h2 className="text-center py-2 py-md-4 main-heading" onClick={pushRoot}>
        Найди работу своей мечты
      </h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <Select
            options={stations}
            isClearable
            value={searchMetroStationValue ? stations.find(station => station.value === searchMetroStationValue) : null}
            placeholder={stations.length ? 'Выберите станцию' : ''}
            noOptionsMessage={({ inputValue }) => inputValue ? 'Ты где такие станции нашел?' : 'Пусто 😕'}
            onChange={(option) => setSearchMetroStationValue(option?.value || null)}
          />
        </div>
        <div className="col-md mb-3">
          <TextBox
            onChange={(value) => setSearchTextValue(value)}
            onKeyDown={handleKeyDown}
            value={searchTextValue}
          />
        </div>
        <div className="col col-md-auto text-center">
          <Button className="mb-3" onClick={handleSubmit}>
            Поиск
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;