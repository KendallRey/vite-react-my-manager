import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type IssueFormatStateType = {
  prefix?: string;
  suffix?: string;
}

export const issueFormatSlice = createSlice({
  name: 'issue-format',
  initialState: {
    removeLink: false,
    hideTitleFilter: true,
    hideLabels: true,
  },
  reducers: {
    editFormat(state, action : PayloadAction<IssueFormatStateType>){
      const { payload } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const { editFormat } = issueFormatSlice.actions;
export default issueFormatSlice.reducer