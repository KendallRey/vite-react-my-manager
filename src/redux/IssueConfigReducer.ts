import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type IssueConfigStateType = {
  removeLink?: boolean;
  hideTitleFilter?: boolean;
  hideLabels?: boolean;
}

export const issueConfigSlice = createSlice({
  name: 'issue-config',
  initialState: {
    removeLink: false,
    hideTitleFilter: true,
    hideLabels: true,
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