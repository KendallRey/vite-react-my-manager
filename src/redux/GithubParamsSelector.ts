import { createSelector } from "@reduxjs/toolkit";
import { GithubParamsSliceType } from "./GithubParamsReducer";

// Selector
export const selectGithubParamss = (state: { params: GithubParamsSliceType }) => state.params;

export const selectGithubTokens = createSelector(
  [selectGithubParamss],
  (params) => params.token
);