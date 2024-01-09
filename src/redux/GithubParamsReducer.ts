import { createSelector, createSlice } from '@reduxjs/toolkit'

export const ACTION_EDIT = 'edit';

type ActionType = {
    type: string,
    payload: {[key: string] : string | null | undefined};
}

export type GithubParamsSliceType = {
    token?: string | undefined;
}

type CaseReducers = {
    editParams : (state: GithubParamsSliceType, action: ActionType) => void;
}

const _editParams = (state: GithubParamsSliceType, action: ActionType) => {
  console.log("teset22",action )
  state = {
    ...state,
    ...action.payload,
  }
}

type CaseSeletors = {
  getGithubParams : (state: { params: GithubParamsSliceType }) => any;
}

export const getGithubParams = (state: { params: GithubParamsSliceType }) => state.params;

const githubParamsSlice = createSlice<GithubParamsSliceType, CaseReducers, 'params', any, 'params'>({
  name: 'params',
  initialState: {
    token: undefined,
  },
  reducers: {
    editParams : _editParams,
  },
  selectors:{
    getGithubParams
  },
})

export const { editParams } = githubParamsSlice.actions;


export default githubParamsSlice.reducer