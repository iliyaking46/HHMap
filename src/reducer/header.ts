import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
  FAILURE_STATUS,
} from '../common/constants';

interface Line {
  id: string;
  hex_color: string;
  name: string;
}

export interface MetroStationItem {
  label: string,
  value: string
}

interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  line: Line;
}

interface MetroLine {
  id: string;
  hex_color: string;
  name: string;
  stations: Station[];
}

export interface HeaderState {
  metroList: MetroLine[];
  status: string;
}

export const loadMetro = createAsyncThunk(
  'header/loadMetro',
  async (id: string = '1') => {
    const metroUrl = 'https://api.hh.ru/metro/' + id;
    const response = await fetch(metroUrl);
    if (!response.ok) {
      throw new Error('Something went wrong ...');
    }
    const data = await response.json();
    return data.lines as MetroLine[];
  },
);

const initialState: HeaderState = {
  metroList: [],
  status: IDLE_STATUS,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadMetro.pending, (state) => {
      state.status = LOADING_STATUS;
    })
    .addCase(loadMetro.fulfilled, (state, action: PayloadAction<MetroLine[]>) => {
      state.metroList = action.payload;
      state.status = SUCCESS_STATUS;
    })
    .addCase(loadMetro.rejected, (state, action) => {
      state.status = FAILURE_STATUS;
      console.error(action.error.message);
    });
  },
});

export default headerSlice.reducer;