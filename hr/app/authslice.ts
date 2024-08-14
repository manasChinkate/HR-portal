import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {
    authority: string | null;
    name: string | null;
    sidebar: sidebarData[];
    companyName:string | null
  }
  interface sidebarData {
    name:string,
    icon:string,
    link:string
  }

  const initialState: AuthState = {
  
    authority: null,
    name: null,
    sidebar:[],
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
          setSidebar: (state, action: PayloadAction<Array<string>>) => {
            state.sidebar = action.payload;
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
    setSidebar,
    setCompany
  } = authSlice.actions;
  
  export default authSlice.reducer;