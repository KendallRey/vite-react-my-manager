import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type IssueConfigStateType = {
  removeLink?: boolean;
  isLabelFilterSubtractive?: boolean;
  hideTitleFilter?: boolean;
}

export const issueConfigSlice = createSlice({
  name: 'issue-config',
  initialState: {
    removeLink: false,
    isLabelFilterSubtractive: false,
    hideTitleFitler: false,
  },
  reducers: {
    editConfig(state, action : PayloadAction<IssueConfigStateType>){
      const { payload } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const { editConfig } = issueConfigSlice.actions;
export default issueConfigSlice.reducer