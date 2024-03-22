import { createSelector } from 'reselect';
import { RootState } from './RootStateType';

const _selectFormat = (state: RootState) => state.format;

export const selectFormat = createSelector(
  [_selectFormat],
  (format) => format
);