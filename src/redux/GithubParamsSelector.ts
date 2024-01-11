import { createSelector } from 'reselect';
import { RootState } from './RootStateType';

const _selectParams = (state: RootState) => state.params;

export const selectToken = createSelector(
  [_selectParams],
  (params) => params.token as string | undefined
);

export const selectParams = createSelector(
  [_selectParams],
  (params) => params
);