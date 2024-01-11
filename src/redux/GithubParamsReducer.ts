import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type GithubParamsStateType = {[key: string] : string | number}

export const githubParamsSlice = createSlice({
  name: 'params',
  initialState: {},
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