import { Octokit } from "@octokit/core";
import { OctokitInstanceType, OctokitInstanceTypeParams } from "./GithubBaseApiType";
import qs from "qs";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });



export const QueryString = (params?: OctokitInstanceTypeParams) => qs.stringify(params);

export const OctokitInstance = async (props : OctokitInstanceType) => {
    const { apiUrl, type, params } = props;
    const parameters = QueryString(params);
    return await octokit.request(`${type} ${apiUrl}?${parameters}`, {
        owner: props.owner ?? '',
        repo: props.repo ?? '',
        org: props.org ?? '',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })
}

export default octokit;