import { createContext, useMemo, useState } from "react";
import { PreferenceContextType, UserGithubInfo } from "./preference-type";
import { useCookies } from 'react-cookie';

export const PreferenceContext = createContext<PreferenceContextType>({
  gihubInfo: null,
  savePreference() {},
  clearPreference() {},
  savedRepos: [],
  repos: [],
  saveRepos(_) {},
  clearRepos() {},
  addSavedRepo(_) {},
  removeSavedRepo(_) {},
  loadSavedRepos() {},
  clearLoadedSavedRepos() {},
});

type PreferenceProviderType = {
  children: React.ReactNode;
};

export const GITHUB_INFO = 'github-info'
export const SAVED_REPOS = 'saved-repos'

const PreferenceProvider: React.FC<PreferenceProviderType> = (props) => {

  const { children } = props;
  const [cookies, setCookies, removeCookie] = useCookies([GITHUB_INFO, SAVED_REPOS]);

  // #region Token and Org

  const SavePreference = (userInfo?: UserGithubInfo) => {

    const newInfo: UserGithubInfo = {
      token: userInfo?.token ?? '',
      orgName: userInfo?.orgName ?? '',
    }

    const stringifiedUser = JSON.stringify(newInfo);
    setCookies(GITHUB_INFO, stringifiedUser, {
      path: '/',
    });
  }

  const ClearPreference = () => {
    removeCookie(GITHUB_INFO);
  }

  const GithubInfo = useMemo(() => {
    try {
      return cookies[GITHUB_INFO] ?? null;
    } catch (e) {
      return null;
    }
  }, [cookies[GITHUB_INFO]]);

  //#endregion

  //#region Repos

  const [repos, setRepos] = useState<string[]>([])

  const SaveRepos = (repos: string[]) => {
    setCookies(SAVED_REPOS, repos, {
      path: '/',
    });
  }

  const AddSavedRepo = (repo: string) => {
    if(SavedRepos?.includes(repo)) return;
    const _repos = SavedRepos ? SavedRepos.concat(repo) : [repo]
    setCookies(SAVED_REPOS, _repos, {
      path: '/',
    });
  }

  const RemoveSavedRepo = (repo: string) => {
    const _repos = SavedRepos ? SavedRepos.filter((item) => item !== repo) : []
    setCookies(SAVED_REPOS, _repos, {
      path: '/',
    });
  }

  const LoadSavedRepos = () => {
    setRepos(SavedRepos ?? [])
  }

  const ClearLoadedSavedRepos = () => setRepos([])

  const ClearRepos = () => {
    removeCookie(SAVED_REPOS);
  }

  const SavedRepos = useMemo(() => {
    try {
      return cookies[SAVED_REPOS] as string[] ?? [];
    } catch (e) {
      return [];
    }
  }, [cookies[SAVED_REPOS]]);

  //#endregion

  return (
    <PreferenceContext.Provider value={{
      gihubInfo: GithubInfo,
      savePreference: SavePreference,
      clearPreference: ClearPreference,
      saveRepos: SaveRepos,
      clearRepos: ClearRepos,
      repos: repos,
      savedRepos: SavedRepos,
      addSavedRepo: AddSavedRepo,
      removeSavedRepo: RemoveSavedRepo,
      loadSavedRepos: LoadSavedRepos,
      clearLoadedSavedRepos: ClearLoadedSavedRepos
    }}>
      {children}
    </PreferenceContext.Provider>
    )

}

export default PreferenceProvider;