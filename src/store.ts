import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/GithubParamsReducer'
import issueConfigReducer from './redux/IssueConfigReducer';
import issueFormatReducer from './redux/IssueFormatReducer';
import githubReducer from './redux/GithubReducer';

export const store = configureStore({
  
    reducer: {
      params: githubParamsReducer,
      config: issueConfigReducer,
      format: issueFormatReducer,
      github: githubReducer,
    },
  })
  
  
export type AppDispatch = typeof store.dispatch;