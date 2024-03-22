
export const GET_REQUEST = "GET"

type RequestType = typeof GET_REQUEST

export const OCTO_KEY_REPO = 'repo'
export const OCTO_KEY_OWNER = 'owner'
export const OCTO_KEY_ORG = 'org'
export const OCTO_KEY_ISSUE_NUMBER = 'issue_number'
export const OCTO_KEY_COLUMN_ID = 'column_id'
export const OCTO_KEY_PROJECT_ID = 'project_id'
export const OCTO_PARAMS_KEY_PER_PAGE = 'per_page'
export const OCTO_PARAMS_KEY_PAGE = 'page'


export type OctokitInstanceType = {
    type: RequestType
    apiUrl: string
    [OCTO_KEY_REPO]? : string | number;
    [OCTO_KEY_OWNER]? : string | number;
    [OCTO_KEY_ORG]?: string | number;
    [OCTO_KEY_ISSUE_NUMBER]?: string | number;
    [OCTO_KEY_COLUMN_ID]?: string | number;
    [OCTO_KEY_PROJECT_ID]?: string | number;
    params?: OctokitInstanceTypeParams
    token?: string
}

export type OctokitInstanceTypeParams = {[name : string] : string | number | boolean}

export type GithubRequestApi = Omit<OctokitInstanceType, 'type' | 'apiUrl'>