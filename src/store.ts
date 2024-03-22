import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/GithubParamsReducer'
import issueConfigReducer from './redux/IssueConfigReducer';
import issueFormatReducer from './redux/IssueFormatReducer';

export const store = configureStore({
  
    reducer: {
      params: githubParamsReducer,
      config: issueConfigReducer,
      format: issueFormatReducer,
    },
  })
  
  
export type AppDispatch = typeof store.dispatch;