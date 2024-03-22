import { createSelector } from 'reselect';
import { RootState } from './RootStateType';

const _selectFilter = (state: RootState) => state.filter;

export const selectFilter = createSelector(
  [_selectFilter],
  (filter) => filter
);