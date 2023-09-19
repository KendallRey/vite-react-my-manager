import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, getAuth, Auth, fetchSignInMethodsForEmail, EmailAuthProvider, signInWithCredential, linkWithPopup, AuthProvider } from "firebase/auth";
import { auth } from "../../FirebaseManager";

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
	.catch((err) => LinkAccoutIfExistingFromError(err, GITHUB_PROVIDER))
}

const LinkAccoutIfExistingFromError = async (err: any, provider : AuthProvider) => {

	if(!err.hasOwnProperty("code")) return null
	if(!err.hasOwnProperty("customData")) return null
	if(!err.hasOwnProperty("name")) return null
	if(!err.customData.hasOwnProperty("email")) return null

	try {

		const user_providers = await fetchSignInMethodsForEmail(auth, err.customData.email)

		if(!user_providers) return null

		const has_gmail = user_providers.includes("google.com")
		if(!has_gmail) return null

		const google_account = await SignInWithGoogle()
		if(!google_account) return null

		return await linkWithPopup(google_account.user, provider)

	}
	catch(e){
		return null
	}
}