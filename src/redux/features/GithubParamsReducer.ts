import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type GithubParamsStateType = {[key: string] : string | number}

const INITIAL_STATE: GithubParamsStateType = {}

export const githubParamsSlice = createSlice({
  name: 'params',
  initialState: INITIAL_STATE,
  reducers: {
    editParams(state, action : PayloadAction<GithubParamsStateType>){
      const { payload } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const { editParams } = githubParamsSlice.actions;
export default githubParamsSlice.reducer