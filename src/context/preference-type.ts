export type UserGithubInfo = {
  token?: string | null;
  orgName?: string | null;
}

export type PreferenceContextType = {
  gihubInfo: UserGithubInfo | null;
  savePreference: (gihubInfo?: UserGithubInfo) => void;
  clearPreference: () => void;
}