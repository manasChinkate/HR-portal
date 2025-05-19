import { holidayReducer } from "./../src/components/MainMaster/AddHoliday/holidaySlice";
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import departmentReducer from "@/components/MainMaster/AddDepartment/departmentSlice";
import { designationReducer } from "@/components/MainMaster/AddDesignation/DesignationSlice";
import { clientReducer } from "@/components/MainMaster/AddClient/clientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    designation: designationReducer,
    holiday: holidayReducer,
    client:clientReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
