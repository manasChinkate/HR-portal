import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { error } from "console";
import { BASE_URL } from "@/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { boolean, string } from "zod";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/department`);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

interface department {
  _id: string;
  department: string;
  companyId: string;
  createdAt: string;
  __v: number;
}
export interface DepartmentState {
  data: department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  data: [],
  loading: true,
  error: null,
};

export const departmentSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.data = action.payload);
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        (state.loading = true),
          (state.error =
            action.error.message || "Failed to fetch Departments " || null);
      });
  },
});

export default departmentSlice.reducer;
