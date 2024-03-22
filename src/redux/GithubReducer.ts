import { GitHubRepository } from '@/components/github-api/response-type/GithubRepositoryType'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type GithubStateType = {
  repositories?: GitHubRepository[];
}

export const githubSlice = createSlice({
  name: 'github',
  initialState: {
    repositories: [] as GitHubRepository[],
  },
  reducers: {
    editGithub(state, action : PayloadAction<GithubStateType>) {
      const { payload } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const { editGithub } = githubSlice.actions;
export default githubSlice.reducer