import { signInWithPopup } from 'firebase/auth'
import Card, { CardContainer } from '../../component/card/Card'
import { auth } from '../../firebase/FirebaseManager'
import SignInApi, { SignOutApi } from '../../firebase/api/auth/AuthApi'
import style from './LandingPage.module.scss'
import { GoogleAuthProvider } from "firebase/auth";
import Input from '../../component/input/Input'

const provider = new GoogleAuthProvider();

const LandingPage = () => {

	const user = auth.currentUser

	console.log("USER",user )


	const login = async () => {
		const test = await signInWithPopup(auth, provider)
		console.log("TEST",test)
		return
		// const auth = await SignInApi({email : 'admins   @email.com', password : "testing1234"})
		// console.log("DATA", auth )
		// const user = auth?.user
	}

	const logout = async () => {
		const auth = await SignOutApi()
		console.log("DATA", auth )
	}

	return (
		<>
		
		<div className={style.container}>
			<div className={style.content}>
				<Input />
				<Input.Money/>
			</div>
		</div>

		<button onClick={login}>
				LOGIN
			</button>
			<button onClick={logout}>
				LOGOUT
			</button>
			<CardContainer>
				<Card>TEST</Card>
				<Card>TEST</Card>
				<Card>TEST</Card>
			</CardContainer>
		</>
	)
}

export default LandingPage