import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
  FAILURE_STATUS,
} from '../common/constants';

export interface VacancyItem {
  id: string;
  name: string;
  employer?: {
    name: string;
    logo_urls?: {
      [key: string]: string;
    };
  };
  address?: {
    metro?: {
      station_name: string;
    };
    lat?: string;
    lng?: string
  };
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  snippet?: {
    requirement: string;
    responsibility: string;
  };
}

export interface VacancyPage {
  items: VacancyItem[];
  page: number;
}

export interface VacanciesState {
  data: VacancyPage[];
  status: string;
  found: string;
  page: number;
  pages: number;
  params: string;
}

const initialState: VacanciesState = {
  data: [],
  status: IDLE_STATUS,
  found: '',
  page: 0,
  pages: 0,
  params: '',
};

export const loadData = createAsyncThunk(
  'vacancies/loadData',
  async (params: string) => {
    const baseUrl = `https://api.hh.ru/vacancies?${params}&area=1`;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong ...');
    }
    const data = await response.json();
    return {
      data: data.items as VacancyItem[],
      found: data.found,
      page: data.page,
      pages: data.pages,
      params,
    };
  },
);

export const loadPage = createAsyncThunk(
  'vacancies/loadPage',
  async ({ params, page }: { params: string; page: number }) => {
    const baseUrl = `https://api.hh.ru/vacancies?${params}&area=1&page=${page}`;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong ...');
    }
    const data = await response.json();
    return {
      data: data.items as VacancyItem[],
      page,
    };
  },
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    changeVacanciesPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadData.pending, (state) => {
      state.status = LOADING_STATUS;
      state.data = [];
    })
    .addCase(loadData.fulfilled, (state, action: PayloadAction<{
      data: VacancyItem[];
      found: string;
      page: number;
      pages: number;
      params: string
    }>) => {
      state.status = SUCCESS_STATUS;
      state.data = [
        {
          items: action.payload.data,
          page: action.payload.page,
        },
      ];
      state.found = action.payload.found;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.params = action.payload.params;
    })
    .addCase(loadData.rejected, (state, action) => {
      state.status = FAILURE_STATUS;
      console.error(action.error.message);
    })
    .addCase(loadPage.pending, (state) => {
      state.status = LOADING_STATUS;
    })
    .addCase(loadPage.fulfilled, (state, action: PayloadAction<{ data: VacancyItem[]; page: number }>) => {
      state.status = SUCCESS_STATUS;
      state.page = action.payload.page;
      state.data.push({
        items: action.payload.data,
        page: action.payload.page,
      });
    })
    .addCase(loadPage.rejected, (state, action) => {
      state.status = FAILURE_STATUS;
      console.error(action.error.message);
    });
  },
});

export const { changeVacanciesPage } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;