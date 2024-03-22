import { GithubParamsStateType } from "./GithubParamsReducer";
import { IssueConfigStateType } from "./IssueConfigReducer";
import { IssueFormatStateType } from "./IssueFormatReducer";

export type RootState = {
    params: GithubParamsStateType;
    config: IssueConfigStateType;
    format: IssueFormatStateType;
};
