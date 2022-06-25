import { configureStore } from '@reduxjs/toolkit'
import distributionReducer from '../features/distribution/distributionSlice'
import serviceReducer from '../features/service/serviceSlice'

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    distribution: distributionReducer
  },
})