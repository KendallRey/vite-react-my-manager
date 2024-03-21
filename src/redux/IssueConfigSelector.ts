import { createSelector } from 'reselect';
import { RootState } from './RootStateType';

const _selectConfig = (state: RootState) => state.config;

export const selectConfig = createSelector(
  [_selectConfig],
  (config) => config
);