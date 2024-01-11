import { RequestApi } from "../../axios/AxiosInstance";
import { GithubAxiosInstance } from "../../axios/GithubAxiosInstance";
import { OctokitInstance } from "../GithubBaseApi";
import { GET_REQUEST, GithubRequestApi, OCTO_KEY_OWNER, OCTO_KEY_REPO } from "../GithubBaseApiType";
import { GitHubIssue } from "../response-type/GithubIssueType";

export const GetRepositoryIssuesApi = async (props: RequestApi) => {
    const { apiUrl, ...cleanProps} = props;
    return GithubAxiosInstance(cleanProps)
    .get(apiUrl)
    .then((res) => res.data)
    .catch((err) => err);
}

export const OctoGetRepositoryIssuesApi = async (props: GithubRequestApi) => {
    const response = await OctokitInstance({ 
        type: GET_REQUEST,
        apiUrl: `/repos/{${OCTO_KEY_OWNER}}/{${OCTO_KEY_REPO}}/issues`,
        ...props
    })
    .then((res) => res.data as GitHubIssue[])
    .catch(() => null)
    return response
}