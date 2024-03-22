import { GitHubRepository } from "@/components/github-api/response-type/GithubRepositoryType";
import { IssueDiscordFilter } from "../RepoIssuesPageType";
import { FormatItem } from "./custom-item/CustomIssueItemType";

export type IssueListType = {
    formats: FormatItem[];
    filter: IssueDiscordFilter 
    repositories?: GitHubRepository[] | null;
    OnRemove?: () => void;
}