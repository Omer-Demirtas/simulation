import { createSlice } from '@reduxjs/toolkit'


const initialState = 
{
  services: [
    {
      title: 1,
    },
    {
      title: 2,
    }
  ],
  serviceTypes: 
  [
    {
      title: 'Default Service'
    }
  ]
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    createTable: (state, action) => 
    {
      console.log({ action, state });
    },
    addService: (state, action) => 
    {
      state.services.push(
        {
          ...action.payload
        }
      );
    },
    addServiceType: (state, action) => 
    {
      state.serviceTypes.push(action.payload)
    }
  },
})


export const { createTable, addService, addServiceType } = serviceSlice.actions

//export const selectCount = (state) => state.counter.value

export default serviceSlice.reducer

/*
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
