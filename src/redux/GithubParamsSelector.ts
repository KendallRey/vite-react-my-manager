import { createSelector } from 'reselect';
import { GithubParamsStateType } from './GithubParamsReducer';

type RootState = {
  params: GithubParamsStateType;
};

const selectParams = (state: RootState) => state.params;

export const selectToken = createSelector(
  [selectParams],
  (params) => params.token as string | undefined
);