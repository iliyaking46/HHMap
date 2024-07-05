import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
  FAILURE_STATUS,
} from '../common/constants';
import { loadData, VacancyItem } from './table';

// Создаем асинхронный thunk
export const loadVacancy = createAsyncThunk(
  'vacancy/loadVacancy',
  async (vacancyId: string) => {
    const baseUrl = `https://api.hh.ru/vacancies/${vacancyId}`;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong ...');
    }
    return await response.json();
  },
);

interface DetailedVacancyItem extends VacancyItem {
  'key_skills': Array<{ name: string }>;
  description: string;

}

interface VacanciesState {
  vacanciesList: DetailedVacancyItem[];
  status: string;
}

const initialState: VacanciesState = {
  vacanciesList: [],
  status: IDLE_STATUS,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadVacancy.pending, (state) => {
      state.status = LOADING_STATUS;
    })
    .addCase(loadVacancy.fulfilled, (state, action) => {
      state.status = SUCCESS_STATUS;
      state.vacanciesList.push(action.payload);
    })
    .addCase(loadVacancy.rejected, (state, action) => {
      state.status = FAILURE_STATUS;
      console.error(action.error.message);
    })
    .addCase(loadData.fulfilled, (state) => {
      state.vacanciesList = [];
    });
  },
});

export default vacancySlice.reducer;