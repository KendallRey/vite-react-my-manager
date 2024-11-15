import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import githubParamsSlice from "../features/GithubParamsReducer";
import issueConfigSlice from "../features/IssueConfigReducer";
import issueFormatSlice from "../features/IssueFormatReducer";
import githubSlice from "../features/GithubReducer";
import githubFilterSlice from "../features/GithubFilterReducer";
import userSlice from '../features/user/userSlice';

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  params: githubParamsSlice,
  config: issueConfigSlice,
  format: issueFormatSlice,
  github: githubSlice,
  filter: githubFilterSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat([]),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
