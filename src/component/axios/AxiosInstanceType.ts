import axios from 'axios';
import qs from 'qs';
import { AxiosInstanceType } from './AxiosInstance';


export const AxiosInstance = (props: AxiosInstanceType) => {
  const { token, signal, params } = props;

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    paramsSerializer: (params) => qs.stringify(params),
    signal,
    params,
  });
};
