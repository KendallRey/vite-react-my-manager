import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi, OCTO_KEY_ISSUE_NUMBER, OCTO_KEY_OWNER, OCTO_KEY_REPO } from "../GithubBaseApiType"
import { GitHubComment } from "../response-type/GithubCommentType"

export const OctoGetIssueCommentsApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: `/repos/{${OCTO_KEY_OWNER}}/{${OCTO_KEY_REPO}}/issues/{${OCTO_KEY_ISSUE_NUMBER}}/comments`,
        ...props
    })
    .then((res) => res.data as GitHubComment[])
    .catch(() => null)
    return response
}