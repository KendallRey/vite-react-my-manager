import { GitHubRepository } from "@/components/github-api/response-type/GithubRepositoryType";
import { IssueDiscordFilter, IssueDiscordFormatType } from "../RepoIssuesPageType";
import { FormatItem } from "./custom-item/CustomIssueItemType";

export type IssueListType = {
    format: IssueDiscordFormatType;
    formats: FormatItem[];
    filter: IssueDiscordFilter 
    repositories?: GitHubRepository[] | null
}