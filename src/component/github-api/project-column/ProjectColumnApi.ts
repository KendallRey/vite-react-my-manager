import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi, OCTO_KEY_COLUMN_ID, OCTO_KEY_PROJECT_ID } from "../GithubBaseApiType"
import { GithubProjectColumn } from "../response-type/GithubProjectColumnType"

export const OctoGetProjectColumnApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: `/projects/columns/{${OCTO_KEY_COLUMN_ID}}`,
        ...props
    })
    .then((res) => res.data as GithubProjectColumn)
    .catch(() => null)
    return response
}

export const OctoGetProjectColumnsApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: `/projects/${OCTO_KEY_PROJECT_ID}/columns`,
        ...props
    })
    .then((res) => res.data as GithubProjectColumn[])
    .catch(() => null)
    return response
}