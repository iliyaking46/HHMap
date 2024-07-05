import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
  FAILURE_STATUS,
} from '../common/constants';
import { VacancyItem } from './table';

export const loadMapData = createAsyncThunk(
  'ymap/loadMapData',
  async ({ params, coords }: { params: string, coords?: [string, string] }) => {
    const urlParams = params;
    const topLatQuery = coords ? `&top_lat=${coords[1][0]}` : '';
    const bottomLatQuery = coords ? `&bottom_lat=${coords[0][0]}` : '';
    const leftLngQuery = coords ? `&left_lng=${coords[0][1]}` : '';
    const rightLngQuery = coords ? `&right_lng=${coords[1][1]}` : '';
    const baseUrl = `https://api.hh.ru/vacancies?${urlParams}&area=1&per_page=100${topLatQuery}${bottomLatQuery}${leftLngQuery}${rightLngQuery}`;

    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong ...');
    }
    const data = await response.json();
    return data.items as VacancyItem[];
  },
);

interface YmapState {
  data: VacancyItem[];
  status: string;
}

const initialState: YmapState = {
  data: [],
  status: IDLE_STATUS,
};

const ymapSlice = createSlice({
  name: 'ymap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadMapData.pending, (state) => {
      state.status = LOADING_STATUS;
    })
    .addCase(loadMapData.fulfilled, (state, action) => {
      state.status = SUCCESS_STATUS;
      state.data = action.payload;
    })
    .addCase(loadMapData.rejected, (state) => {
      state.status = FAILURE_STATUS;
    });
  },
});

export default ymapSlice.reducer;