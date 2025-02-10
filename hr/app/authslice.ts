import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface Notification {
  _id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  companyName: string;
  __v: number;
}

export interface AuthState {
    authority: string | null;
    name: string | null;
 
    companyName:string | null;
    email:string | null;
    userId: string | null;
    notifications: Notification[] 
  }
 

  const initialState: AuthState = {
  
    authority: null,
    name: null,
    email:null,
    companyName:null,
    userId:null,
    notifications:[]
   
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setauthority: (state, action: PayloadAction<string>) => {
            state.authority = action.payload;
          },
          setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
          },
          setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
          },
         
          setCompany: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload;
          },
          setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
          },
          setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
          },
          cleanUp: (state) => {
            state.authority = null;
            state.name = null;
            state.userId = null;
            state.companyName = null;
            state.email = null;
            state.notifications = [];
            
          },
    }
})

export const {
    setauthority,
    setName,
    cleanUp,
    setEmail,
    setCompany,
    setUserId,
    setNotifications
  } = authSlice.actions;
  
  export default authSlice.reducer;