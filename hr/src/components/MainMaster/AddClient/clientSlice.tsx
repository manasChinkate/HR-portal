
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constants";

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/client`);
      return res.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export interface Client {
  _id: string;
  clientName: string;
  state: string;
  country: string;
  contactPerson: string;
  contactPersonPhone: string;
  companyId: string;
  createdAt: string; // ISO string format
  __v: number;
}


export interface ClientState {
  data: Client[];
  loading: boolean;
  error: null | string;
}
const initialState: ClientState = {
  data: [],
  loading: true,
  error: null,
};

export const clientSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.data = []);
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed fetching Holidays" || null;
      });
  },
});

export const clientReducer = clientSlice.reducer
