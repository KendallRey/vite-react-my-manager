import { GitHubIssue } from "../../../component/github-api/response-type/GithubIssueType"
import { IssueDiscordFormatType } from "../RepoIssuesPageType"

export type IssueItemType = {
    format?: IssueDiscordFormatType
    issue: GitHubIssue
}