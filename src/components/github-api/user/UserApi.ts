import { IGithubFollowerSchema } from "@/model/follower/follower"
import { OctokitInstance } from "../GithubBaseApi"
import { GET_REQUEST, GithubRequestApi } from "../GithubBaseApiType"

export const OctoGetUserFollowersApi = async (props: GithubRequestApi) => {
  const response = await OctokitInstance({ 
      type: GET_REQUEST,
      apiUrl: `/user/followers`,
      ...props
  })
  .then((res) => res.data as IGithubFollowerSchema[])
  .catch(() => null)
  return response
}

export const OctoGetUserFollowingsApi = async (props: GithubRequestApi) => {
  const response = await OctokitInstance({ 
      type: GET_REQUEST,
      apiUrl: `/users/KendallRey/following`,
      ...props
  })
  .then((res) => res.data as IGithubFollowerSchema[])
  .catch(() => null)
  return response
}