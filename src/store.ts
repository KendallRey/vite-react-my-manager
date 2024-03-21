import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/GithubParamsReducer'
import issueConfigReducer from './redux/IssueConfigReducer';

export const store = configureStore({
  
    reducer: {
      params: githubParamsReducer,
      config: issueConfigReducer
    },
  })
  
  
export type AppDispatch = typeof store.dispatch;