import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, getAuth, Auth } from "firebase/auth";

const GOOGLE_AUTH_PROVIDER = new GoogleAuthProvider()
const FACEBOOK_PROVIDER = new FacebookAuthProvider()
const TWITTER_PROVIDER = new TwitterAuthProvider()
const GITHUB_PROVIDER = new GithubAuthProvider()

export const SignInWithGoogle = async () => {
	return await signInWithPopup(getAuth(), GOOGLE_AUTH_PROVIDER)
	.then((res) => {
		return res
	})
	.catch(() => {
		return null
	})
}

export const SignInWithFacebook = async (auth : Auth) => {
	return await signInWithPopup(auth, FACEBOOK_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		console.log("FB_ERR", err)
		return null
	})
}

export const SignInWithTwitter = async () => {
	return await signInWithPopup(getAuth(), TWITTER_PROVIDER)
	.then((res) => {
		return res
	})
	.catch(() => {
		return null
	})
}


export const SignInWithGithub = async () => {
	return await signInWithPopup(getAuth(), GITHUB_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		console.log("GIT_ERR", err)
		return null
	})
}
