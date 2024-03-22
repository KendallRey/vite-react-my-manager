import { IssueDiscordFilter } from "../RepoIssuesPageType";
import { FormatItem } from "./custom-item/CustomIssueItemType";

export type IssueListType = {
    formats: FormatItem[];
    filter: IssueDiscordFilter 
    OnRemove?: () => void;
}