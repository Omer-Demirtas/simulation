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

};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createTable: (state, action) => 
    {
      state.value++;
    },
    addService: (state, action) => 
    {
      state.services.push(
        {
          title: state.services[state.services.length - 1].title+1
        }
      );
    }
  },
})


export const { createTable, addService } = counterSlice.actions

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer

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
