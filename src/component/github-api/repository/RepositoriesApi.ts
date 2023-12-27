import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi } from "../GithubBaseApiType"
import { GitHubRepository } from "../response-type/GithubRepositoryType"

export const OctoGetRepositoriesApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: '/orgs/{org}/repos',
        ...props
    })
    .then((res) => res.data as GitHubRepository[])
    .catch(() => null)
    return response
}