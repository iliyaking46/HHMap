import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { MainLayout } from './containers/MainLayout';
import JobsList from './containers/JobsList';
import Map from './containers/Map';
import VacancyPage from './containers/VacancyPage';
import { Navigation } from './components/Navigation';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<Navigation />}>
            <Route path="vacancies" element={<JobsList />} />
            <Route path="map" element={<Map />} />
          </Route>
          <Route path="vacancy/:id" element={<VacancyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default Root;
