import { createContext, useMemo } from "react";
import { PreferenceContextType, UserGithubInfo } from "./preference-type";
import { useCookies } from 'react-cookie';

export const PreferenceContext = createContext<PreferenceContextType>({
  gihubInfo: null,
  savePreference() {},
  clearPreference() {},
});

type PreferenceProviderType = {
  children: React.ReactNode;
};

export const GITHUB_INFO = 'github-info'

const PreferenceProvider: React.FC<PreferenceProviderType> = (props) => {

  const { children } = props;
  const [cookies, setCookies, removeCookie] = useCookies([GITHUB_INFO]);

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

  return (
    <PreferenceContext.Provider value={{
      gihubInfo: GithubInfo,
      savePreference: SavePreference,
      clearPreference: ClearPreference,
    }}>
      {children}
    </PreferenceContext.Provider>
    )

}

export default PreferenceProvider;