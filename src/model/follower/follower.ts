import { z } from "zod";
import { booleanOptional, stringOptional } from "./base";

export const GithubFollowerSchema = z.object({
  login: stringOptional ,
  id: z.number() ,
  node_id: stringOptional ,
  avatar_url: stringOptional ,
  gravatar_id: stringOptional,
  url: stringOptional ,
  html_url: stringOptional ,
  followers_url: stringOptional,
  following_url: stringOptional ,
  gists_url: stringOptional ,
  starred_url: stringOptional,
  subscriptions_url: stringOptional,
  organizations_url: stringOptional ,
  repos_url: stringOptional,
  events_url: stringOptional ,
  received_events_url: stringOptional ,
  type: stringOptional ,
  user_view_type: stringOptional ,
  site_admin: booleanOptional
});
export type IGithubFollowerSchema = z.infer<typeof GithubFollowerSchema>;