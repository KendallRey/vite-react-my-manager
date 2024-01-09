import { createSelector, createSlice } from '@reduxjs/toolkit'

export const ACTION_EDIT = 'edit';

type ActionType = {
    type: string,
    payload: {[key: string] : string | null | undefined};
}

export type GithubParamsSliceType = {
    token: string[];
}

type CaseReducers = {
    editParams : (state: GithubParamsSliceType, action: ActionType) => void;
}

const _editParams = (state: any, action: ActionType) => {
  
  console.log("B",state)

  state = {
    token: '123',
    ...state,
    ...action.payload,
  }
  console.log("A",state )
}

type CaseSeletors = {
  getGithubParams: (state: any) => GithubParamsSliceType;
};

const _getGithubParams = (state: { params: GithubParamsSliceType }) => state.params;

export const githubParamsSlice = createSlice({
  name: 'params',
  initialState: [],
  reducers: {
    editParams(state, action){
      
      console.log("S",state)
      console.log("B",state.token)
      console.log("A",action)
      state.push(action.payload)
    },
  },
})

export const { editParams } = githubParamsSlice.actions;


export default githubParamsSlice.reducer