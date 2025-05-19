
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constants";

export const fetchHolidays = createAsyncThunk(
  "holiday/fetchHoliday",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/holiday`);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

interface Holiday {
  _id: string;
  holiday: string;
  fromDate: string; // Format: "YYYY-MM-DD"
  toDate: string; // Format: "YYYY-MM-DD"
  companyId: string;
  createdAt: string; // or `Date` if parsed
  __v: number;
}

export interface HolidayState {
  data: Holiday[];
  loading: boolean;
  error: null | string;
}
const initialState: HolidayState = {
  data: [],
  loading: true,
  error: null,
};

export const holidaySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.data = []);
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed fetching Holidays" || null;
      });
  },
});

export const holidayReducer = holidaySlice.reducer
