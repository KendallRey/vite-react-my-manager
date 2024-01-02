import { GitHubIssue } from "../../../../component/github-api/response-type/GithubIssueType"


export const FormatItemText = 'TEXT'
export const FormatItemField = 'FIELDS'
export type CustomIssueItemTypes = typeof FormatItemText | typeof FormatItemField

export type FormatItem = {id: string} &(FormatItemTextType | FormatItemFieldType)

export type FormatItemTextType = {
    name: string
    type: typeof FormatItemText
    value: string
}

export type FormatItemFieldType = {
    name: string
    type: typeof FormatItemField
    value: string
}

export type CustomIssueItemType = {
    issue: GitHubIssue
    formats: FormatItem[]
}