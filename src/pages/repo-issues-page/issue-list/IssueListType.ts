import { GitHubIssue } from "../../../component/github-api/response-type/GithubIssueType"
import { GitHubLabel } from "../../../component/github-api/response-type/GithubLabelType";
import { IssueDiscordFormatType } from "../RepoIssuesPageType";
import { FormatItem } from "./custom-item/CustomIssueItemType";

export type IssueListType = {
    issues?: GitHubIssue[];
    labels? : GitHubLabel[];
    format: IssueDiscordFormatType;
    formats: FormatItem[];
}