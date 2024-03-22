import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/GithubParamsReducer'
import issueConfigReducer from './redux/IssueConfigReducer';
import issueFormatReducer from './redux/IssueFormatReducer';
import githubFilterReducer from './redux/GithubFilterReducer';
import githubReducer from './redux/GithubReducer';

export const store = configureStore({
  
    reducer: {
      params: githubParamsReducer,
      config: issueConfigReducer,
      format: issueFormatReducer,
      github: githubReducer,
      filter: githubFilterReducer,
    },
  })
  
  
export type AppDispatch = typeof store.dispatch;