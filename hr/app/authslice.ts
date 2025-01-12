import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {
    authority: string | null;
    name: string | null;
 
    companyName:string | null;
    email:string | null;
    userId: string | null
  }
 

  const initialState: AuthState = {
  
    authority: null,
    name: null,
    email:null,
    companyName:null,
    userId:null,
   
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
          cleanUp: (state) => {
            state.authority = null;
            state.name = null;
            state.userId = null;
            state.companyName = null;
            state.email = null;
            
          },
    }
})

export const {
    setauthority,
    setName,
    cleanUp,
    setEmail,
    setCompany,
    setUserId
  } = authSlice.actions;
  
  export default authSlice.reducer;