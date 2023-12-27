import { Octokit } from "@octokit/core";
import { OctokitInstanceType } from "./GithubBaseApiType";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });

export const OctokitInstance = async (props : OctokitInstanceType) => {
    const { apiUrl, type } = props;
    return await octokit.request(`${type} ${apiUrl}`, {
        owner: props.owner ?? '',
        repo: props.repo ?? '',
        org: props.org ?? '',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
}

export default octokit;