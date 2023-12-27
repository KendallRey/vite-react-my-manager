import axios from 'axios';
import qs from 'qs';
import { AxiosInstanceType } from './AxiosInstance';


export const GithubAxiosInstance = (props: AxiosInstanceType) => {
  const { token, signal, params } = props;

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'x-github-api-version-selected' : '2022-11-28',
      'Accept' : 'application/vnd.github+json',
    },
    paramsSerializer: (params) => qs.stringify(params),
    signal,
    params,
  });
};
