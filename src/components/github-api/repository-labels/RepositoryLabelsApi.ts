import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi, OCTO_KEY_OWNER, OCTO_KEY_REPO } from "../GithubBaseApiType"
import { GitHubLabel } from "../response-type/GithubLabelType"

  export const OctoGetRepositoryLabelsApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: `/repos/{${OCTO_KEY_OWNER}}/{${OCTO_KEY_REPO}}/labels`,
        ...props
    })
    .then((res) => res.data as GitHubLabel[])
    .catch(() => null)
    return response
}