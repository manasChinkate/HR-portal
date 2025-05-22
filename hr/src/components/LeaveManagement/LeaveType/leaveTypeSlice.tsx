import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaveTypes = createAsyncThunk(
  "leaveType/fetchLeaveTypes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/leavetype`);
      return res.data.data;
    } catch (error: any) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export interface LeaveType {
  _id: string; // ObjectId as string
  leaveType: string;
  count: string; // or number, if you convert it later
  companyId: string; // ObjectId as string
  createdAt: string; // ISO string; or `Date` if you parse it
  __v: number;
}

export interface LeaveTypeState {
  data: null;
  loading: boolean;
  error: null | string;
}

const initialState: LeaveTypeState = {
  data: null,
  loading: true,
  error: null,
};

export const LeaveTypeSlice = createSlice({
  name: "leaveType/fetchLeaveType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveTypes.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchLeaveTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLeaveTypes.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message || "Failed fetching leaveTypes";
      })
  },
});


export const LeaveTypeReducer = LeaveTypeSlice.reducer
