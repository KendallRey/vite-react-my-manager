import { GitHubIssue } from "@/components/github-api/response-type/GithubIssueType"
import { IssueDiscordFormatType } from "../../RepoIssuesPageType"

export type IssueItemType = {
    format?: IssueDiscordFormatType
    issue: GitHubIssue
}