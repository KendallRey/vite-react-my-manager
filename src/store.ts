import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/GithubParamsReducer'

export const store = configureStore({
  
    reducer: {
      params: githubParamsReducer,
    },
  })
  
  
export type AppDispatch = typeof store.dispatch;