import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TitleFilter = {
  id: string;
  value: string;
}

export type GithubFilterStateType = {
  title_includes?: TitleFilter[],
  title_excludes?: TitleFilter[],
  title_on?: boolean
}

export const githubFilterSlice = createSlice({
  name: 'filter',
  initialState: {
    title_includes: [] as TitleFilter[],
    title_excludes: [] as TitleFilter[],
    title_on: false,
  },
  reducers: {
    addTitleIncludeFilter(state, action : PayloadAction<TitleFilter>) {
      const { payload } = action
      return {
        ...state,
        title_includes: state.title_includes.concat(payload),
      }
    },
    removeTitleIncludeFilter(state, action : PayloadAction<string>) {
      const { payload } = action
      return {
        ...state,
        title_includes: state.title_includes.filter((item) => item.id !== payload),
      }
    },
    onChangeTitleIncludeFilter(state, action : PayloadAction<TitleFilter>) {
      const { payload } = action
      return {
        ...state,
        title_includes: state.title_includes.map((item) => {
          if(payload.id === item.id) {
            return {
              ...item,
              value: payload.value,
            }
          }
          return item;
        }),
      }
    },
    addTitleExcludeFilter(state, action : PayloadAction<TitleFilter>) {
      const { payload } = action
      return {
        ...state,
        title_excludes: state.title_excludes.concat(payload),
      }
    },
    removeTitleExcludeFilter(state, action : PayloadAction<string>) {
      const { payload } = action
      return {
        ...state,
        title_excludes: state.title_excludes.filter((item) => item.id !== payload),
      }
    },
    onChangeTitleExcludeFilter(state, action : PayloadAction<TitleFilter>) {
      const { payload } = action
      return {
        ...state,
        title_excludes: state.title_excludes.map((item) => {
          if(payload.id === item.id) {
            return {
              ...item,
              value: payload.value,
            }
          }
          return item;
        }),
      }
    },
    toggleTitleFilter(state, action: PayloadAction<boolean | undefined>) {
      const { payload } = action
      if(payload === undefined) 
        return {
          ...state,
          title_on: !state.title_on,
        }
      return {
        ...state,
        title_on: payload,
      }
    }
  },
})

export const {
  addTitleIncludeFilter,
  removeTitleIncludeFilter,
  addTitleExcludeFilter,
  removeTitleExcludeFilter,
  toggleTitleFilter,
  onChangeTitleExcludeFilter,
  onChangeTitleIncludeFilter,
} = githubFilterSlice.actions;
export default githubFilterSlice.reducer