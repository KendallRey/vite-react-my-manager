export type UserGithubInfo = {
  token?: string | null;
  orgName?: string | null;
}

export type PreferenceContextType = {
  gihubInfo: UserGithubInfo | null;
  savePreference: (gihubInfo?: UserGithubInfo) => void;
  clearPreference: () => void;
  savedRepos: string[];
  repos: string[];
  saveRepos: (repos: string[]) => void;
  clearRepos: () => void;
  addSavedRepo: (repoName: string) => void;
  removeSavedRepo: (repoName: string) => void;
  loadSavedRepos: () => void;
  clearLoadedSavedRepos: () => void;
}