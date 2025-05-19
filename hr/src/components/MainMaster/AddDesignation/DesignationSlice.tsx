import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDesignations = createAsyncThunk(
  "designations/fetchDesignations",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/designation`);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

interface Designation {
  _id: string;
  designation: string;
  companyId: string;
  createdAt: string; // or `Date` if you parse it
  __v: number;
}

export interface DesignationState {
  data: Designation[];
  loading: boolean;
  error: string | null;
}

const initialState: DesignationState = {
  data: [],
  loading: true,
  error: null,
};

export const designationSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.data = [];
        state.loading = true;
        state.error =
          action.error.message || "Failed fetching Designations" || null;
      });
  },
});

export const designationReducer = designationSlice.reducer;
