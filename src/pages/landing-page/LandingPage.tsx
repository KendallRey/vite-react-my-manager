import { signInWithPopup } from 'firebase/auth'
import Card, { CardContainer } from '../../component/card/Card'
import { auth } from '../../firebase/FirebaseManager'
import SignInApi, { SignOutApi } from '../../firebase/api/auth/AuthApi'
import style from './LandingPage.module.scss'
import { GoogleAuthProvider } from "firebase/auth";
import Input from '../../component/input/Input'
import AuthProvider from '../../component/auth-provider/AuthProvider'
import Section from '../../component/section/Section'
import Button from '../../component/button/Button'

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
			</div>
			<div className={style.content}>
				<Section.Blur>
					<h2 className='text-2xl mb-4'>Login</h2>
					<hr/>
					<Input.Text
						required
						label='Username'
						placeholder='Username'/>
					<Input.Text
						required
						label='Password'
						type='password'
						placeholder='Password'/>
					<div className='my-4 flex gap-4 justify-center'>
						<Button.Action
							className='flex-grow'>
							LOGIN
						</Button.Action>
						<Button
							className='flex-grow'>
							SIGN UP
						</Button>
					</div>
					<div className='m-4 flex gap-4 justify-center'>
						<AuthProvider.Facebook onAuth={()=>{}}/>
						<AuthProvider.Google onAuth={()=>{}}/>
						<AuthProvider.Twitter onAuth={()=>{}}/>
						<AuthProvider.Github onAuth={()=>{}}/>
					</div>
					
				</Section.Blur>
				
			</div>
		</div>

		</>
	)
}

export default LandingPage