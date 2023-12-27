
export const GET_REQUEST = "GET"

type RequestType = typeof GET_REQUEST

export type OctokitInstanceType = {
    type: RequestType
    apiUrl: string
    repo? : string;
    owner? : string;
    org?: string;
}

export type GithubRequestApi = Omit<OctokitInstanceType, 'type' | 'apiUrl'>