import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { auth } from "../../FirebaseManager"

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
    .catch((err) => {
        console.log("test",err)
        return null
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

