import { Octokit } from "@octokit/core";
import { OCTO_KEY_COLUMN_ID, OCTO_KEY_ISSUE_NUMBER, OCTO_KEY_ORG, OCTO_KEY_OWNER, OCTO_KEY_PROJECT_ID, OCTO_KEY_REPO, OctokitInstanceType, OctokitInstanceTypeParams } from "./GithubBaseApiType";
import qs from "qs";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });

const newOctokit = (token: string) => new Octokit({ auth: token });

export const QueryString = (params?: OctokitInstanceTypeParams) => qs.stringify(params);

export const OctokitInstance = async (props : OctokitInstanceType) => {
    const { apiUrl, type, params, token } = props;
    const parameters = QueryString(params);

    const _octokit = !token ? octokit : 
      token.trim() === '' ? octokit : 
      newOctokit(token);

    return await _octokit.request(`${type} ${apiUrl}?${parameters}`, {
        [OCTO_KEY_OWNER]: props[OCTO_KEY_OWNER] ?? '',
        [OCTO_KEY_REPO]: props[OCTO_KEY_REPO] ?? '',
        type: 'private',
        [OCTO_KEY_ORG]: props[OCTO_KEY_ORG] ?? '',
        [OCTO_KEY_ISSUE_NUMBER]: props[OCTO_KEY_ISSUE_NUMBER] ?? '',
        [OCTO_KEY_COLUMN_ID]: props[OCTO_KEY_COLUMN_ID] ?? '',
        [OCTO_KEY_PROJECT_ID]: props[OCTO_KEY_PROJECT_ID] ?? '',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })
}

export default octokit;