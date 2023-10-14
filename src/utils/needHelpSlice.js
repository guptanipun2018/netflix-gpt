import { createSlice } from "@reduxjs/toolkit";


const needHelpSlice = createSlice({
   name:"needHelp" ,
   initialState:{
    showNeedHelp:false,
   },
   reducers:{
    toggleNeedHelpSearch:(state)=>{
        state.showNeedHelp = !state.showNeedHelp;
    }
   }
})
export const{toggleNeedHelpSearch}=needHelpSlice.actions
export default needHelpSlice.reducer;