import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
    open: false,
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: 
    {
        openDialog: (state, action) => 
        {
            state.open = true
        },
        closeDialog: (state, action) => 
        {
            state = {open: false}
        }
    },
  })
  
  
  export const { openDialog, closeDialog } = dialogSlice.actions
  
  export default dialogSlice.reducer;