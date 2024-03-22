import { createSelector } from 'reselect';
import { RootState } from './RootStateType';

const _selectGithub = (state: RootState) => state.github;

export const selectGithub = createSelector(
  [_selectGithub],
  (github) => github
);