import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/githubParamsReducer'

export const store = configureStore({
    reducer: {
      params: githubParamsReducer,
    }
  })