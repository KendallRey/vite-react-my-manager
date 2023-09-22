import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { auth } from "../../FirebaseManager"
import { FIREBASE_AUTHENTICATION_ERRORS } from "../../AuthErrorList"

type SignInApiType = {
	email : string
	password : string
}

const SignInApi = async ({
	email,
	password,
} : SignInApiType) => {
	return await signInWithEmailAndPassword(auth, email, password)
	.then((res) => {
		return res
	})
	.catch((error) => {
		
		console.log("12312312",error.code)
		try {
			const error_match = FIREBASE_AUTHENTICATION_ERRORS.find((item) => item.id === error.code)
			if(error_match)
				return error_match.message
			return "An error occured. Code: 501"
		}
		catch{
			return "An error occured. Code: 502"
		}
		
	})
}

export default SignInApi

export const SignOutApi = async () => {

	return await signOut(auth)
	.then(() => {
		return true
	})
	.catch(() => {
		return null
	})
}

