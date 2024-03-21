export type IssueDiscordFormatType = {
    prefix: '';
    suffix: '';
}

export const TITLE_FILTER_TYPE_INCLUDES = 'titleIncludes'
export const TITLE_FILTER_TYPE_EXCLUDES = 'titleExcludes'

export type TitleFilterType = typeof TITLE_FILTER_TYPE_INCLUDES | typeof TITLE_FILTER_TYPE_EXCLUDES 

export type IssueDiscordFilter = {
    isOn: boolean;
    [TITLE_FILTER_TYPE_INCLUDES]: { id: string, value: string }[];
    [TITLE_FILTER_TYPE_EXCLUDES]: { id: string, value: string }[];
}