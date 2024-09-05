import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {
    authority: string | null;
    name: string | null;
 
    companyName:string | null;
    email:string | null;
  }
 

  const initialState: AuthState = {
  
    authority: null,
    name: null,
  
    companyName:null
   
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
          cleanUp: (state) => {
            state.authority = null;
            state.name = null;
            
          },
    }
})

export const {
    setauthority,
    setName,
    cleanUp,
    setEmail,
    setCompany
  } = authSlice.actions;
  
  export default authSlice.reducer;