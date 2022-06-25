import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
    cumulative: {
        1: 15,
        2: 30,
        3: 15,
        4: 25,
        5: 15
    },
    uniform: {
        a: 10,
        b: 20
    }
}

export const distributionSlice = createSlice({
    name: 'distribution',
    initialState,
    reducers: 
    {
        updateDefaults: (state, action) => 
        {

        }
    },
  })
  
  
  export const { updateDefaults } = distributionSlice.actions
  
  export const selectCumulative = (state) => state.distribution.cumulative
  export const selectUniform = (state) => state.distribution.uniform;
  export const selectAllDistribution = (state) => state.distribution;
  
  export default distributionSlice.reducer;