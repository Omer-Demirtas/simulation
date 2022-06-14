import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})