export type UserGithubInfo = {
  token?: string | null;
  orgName?: string | null;
}

export type SavedRepo = {
  id: string;
  labels: string[];
}

export type PreferenceContextType = {
  gihubInfo: UserGithubInfo | null;
  savePreference: (gihubInfo?: UserGithubInfo) => void;
  clearPreference: () => void;
  savedRepos: SavedRepo[];
  repos: SavedRepo[];
  saveRepos: (repos: string[]) => void;
  clearRepos: () => void;
  addSavedRepo: (repoConfig: SavedRepo) => void;
  removeSavedRepo: (repoName: string) => void;
  loadSavedRepos: () => void;
  clearLoadedSavedRepos: () => void;
}