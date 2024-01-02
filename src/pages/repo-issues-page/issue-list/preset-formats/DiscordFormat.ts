import { FormatItem } from "../custom-item/CustomIssueItemType"

export type DiscordFormatPresetType = {
    id: string
    formats: FormatItem[]
}

export const DiscordFormatPreset : DiscordFormatPresetType = {
    id: 'disord-format-preset',
    formats: [
        {
            id: 'dfp-1',
            name: 'text',
            type: 'TEXT',
            value: '- __[',
        },
        {
            id: 'dfp-2',
            name: 'number',
            type: 'FIELDS',
            value: 'number',
        },
        {
            id: 'dfp-3',
            name: 'text',
            type: 'TEXT',
            value: '](',
        },
        {
            id: 'dfp-4',
            name: 'text',
            type: 'FIELDS',
            value: 'html_url',
        },
        {
            id: 'dfp-5',
            name: 'text',
            type: 'TEXT',
            value: ')__ ',
        },
        {
            id: 'dfp-6',
            name: 'text',
            type: 'FIELDS',
            value: 'title',
        },
    ]
}