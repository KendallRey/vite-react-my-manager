import { GithubParamsStateType } from "./GithubParamsReducer";
import { IssueConfigStateType } from "./IssueConfigReducer";

export type RootState = {
    params: GithubParamsStateType;
    config: IssueConfigStateType;
};
