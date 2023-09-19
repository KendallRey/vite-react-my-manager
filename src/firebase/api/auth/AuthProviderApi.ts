import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, getAuth, Auth } from "firebase/auth";


export const SignInWithGoogle = async () => {
	const GOOGLE_AUTH_PROVIDER = new GoogleAuthProvider()
	return await signInWithPopup(getAuth(), GOOGLE_AUTH_PROVIDER)
	.then((res) => {
		return res
	})
	.catch(() => {
		return null
	})
}

export const SignInWithFacebook = async (auth : Auth) => {
	const FACEBOOK_PROVIDER = new FacebookAuthProvider()
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
	const TWITTER_PROVIDER = new TwitterAuthProvider()
	return await signInWithPopup(getAuth(), TWITTER_PROVIDER)
	.then((res) => {
		return res
	})
	.catch(() => {
		return null
	})
}


export const SignInWithGithub = async () => {
	const GITHUB_PROVIDER = new GithubAuthProvider()
	return await signInWithPopup(getAuth(), GITHUB_PROVIDER)
	.then((res) => {
		return res
	})
	.catch((err) => {
		console.log("GIT_ERR", err)
		return null
	})
}
