import { GithubParamsStateType } from "./GithubParamsReducer";
import { GithubStateType } from "./GithubReducer";
import { IssueConfigStateType } from "./IssueConfigReducer";
import { IssueFormatStateType } from "./IssueFormatReducer";

export type RootState = {
    params: GithubParamsStateType;
    config: IssueConfigStateType;
    format: IssueFormatStateType;
    github: GithubStateType;
};
