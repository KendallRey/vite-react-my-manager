import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi } from "../GithubBaseApiType"
import { GitHubComment } from "../response-type/GithubCommentType"

export const OctoGetIssueCommentsApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
        ...props
    })
    .then((res) => res.data as GitHubComment[])
    .catch(() => null)
    return response
}