import { FormatItemField, FormatItemFieldType } from "./CustomIssueItemType";

export const ISSUE_TITLE : FormatItemFieldType = {
    name: 'Title',
    type: FormatItemField,
    value: 'title'
}

export const ISSUE_NUMBER : FormatItemFieldType = {
    name: 'Number',
    type: FormatItemField,
    value: 'number'
}

export const ISSUE_HTML_URL : FormatItemFieldType = {
    name: 'HTML Url',
    type: FormatItemField,
    value: 'html_url'
}

export const GITHUB_FIELDS = [
    ISSUE_TITLE,
    ISSUE_NUMBER,
    ISSUE_HTML_URL,
]