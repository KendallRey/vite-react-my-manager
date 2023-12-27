import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi } from "../GithubBaseApiType"
import { GitHubLabel } from "../response-type/GithubLabelType"

  export const OctoGetRepositoryLabelsApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: '/repos/{owner}/{repo}/labels',
        ...props
    })
    .then((res) => res.data as GitHubLabel[])
    .catch(() => null)
    return response
}