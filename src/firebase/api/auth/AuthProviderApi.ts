import { Auth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";

const GOOGLE_AUTH_PROVIDER = new GoogleAuthProvider()
const FACEBOOK_PROVIDER = new FacebookAuthProvider()
const TWITTER_PROVIDER = new TwitterAuthProvider()
const GITHUB_PROVIDER = new GithubAuthProvider()

export const SignInWithGoogle = async (auth : Auth) => {
	return await signInWithPopup(auth, GOOGLE_AUTH_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		return null
	})
}

export const SignInWithFacebook = async (auth : Auth) => {
	return await signInWithPopup(auth, FACEBOOK_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		return null
	})
}

export const SignInWithTwitter = async (auth : Auth) => {
	return await signInWithPopup(auth, TWITTER_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		return null
	})
}


export const SignInWithGithub = async (auth : Auth) => {
	return await signInWithPopup(auth, GITHUB_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		return null
	})
}
