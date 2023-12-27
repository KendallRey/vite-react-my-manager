import { GitHubIssue } from "../../../component/github-api/response-type/GithubIssueType"
import { GitHubLabel } from "../../../component/github-api/response-type/GithubLabelType";
import { IssueDiscordFormatType } from "../RepoIssuesPageType";

export type IssueListType = {
    issues: GitHubIssue[];
    labels? : GitHubLabel[];
    format: IssueDiscordFormatType;
}