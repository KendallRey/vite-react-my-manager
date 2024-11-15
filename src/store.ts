import { configureStore } from '@reduxjs/toolkit'
import githubParamsReducer from './redux/features/GithubParamsReducer'
import issueConfigReducer from './redux/features/IssueConfigReducer';
import issueFormatReducer from './redux/features/IssueFormatReducer';
import githubFilterReducer from './redux/features/GithubFilterReducer';
import githubReducer from './redux/features/GithubReducer';

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