import SignInApi from '../../firebase/api/auth/AuthApi'
import style from './LandingPage.module.scss'
import Input from '../../component/input/Input'
import AuthProvider from '../../component/auth-provider/AuthProvider'
import Section from '../../component/section/Section'
import Button from '../../component/button/Button'
import { useState } from 'react'
import { CleanText } from '../../utils/DataHandler'
import { useNavigate } from 'react-router-dom'
import BulletList from '../../component/bullet-list/BulletList'

const LandingPage = () => {

	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)

	// 
	//#region Login Date on Change

	const [loginData, setLoginData] = useState({
		email : "",
		password : "",
	})

	const onChangeLogin = (e : RCE<HTMLInputElement>) => {
		const { name, value } = e.target
		const clean_value = CleanText(value)
		setErrors([])
		setLoginData(prev => ({...prev, [name] : clean_value }))
	}

	//#endregion
	// 

	// 
	//#region Login on Submit

	const [loginErrors, setErrors] = useState<string[]>([])

	const onSubmitLogin = async (e : React.FormEvent) => {
		e.preventDefault()
		setErrors([])
		setIsLoading(true)

		const auth = await SignInApi(loginData)

		setIsLoading(false)

		if(typeof(auth) === "string"){
			setErrors([auth])
			return
		}

		if(auth){
			navigate("/user", {replace : true})
		}
	}

	//#endregion
	// 


	return (
		<>
		<div className={style.container}>
			<div className={style.content}>
			</div>
			<div className={style.content}>
				<Section.Blur>
					<form onSubmit={onSubmitLogin}>
						<h2 className='text-2xl mb-4'>Login</h2>
						<hr/>
						<Input.Text
							type='email'
							required
							label='Email'
							name='email'
							onChange={onChangeLogin}
							value={loginData.email}
							disabled={isLoading}
							placeholder='Email'/>
						
						<Input.Text
							required
							label='Password'
							name='password'
							onChange={onChangeLogin}
							value={loginData.password}
							type='password'
							disabled={isLoading}
							placeholder='Password'/>
						<BulletList.Error
							hide={loginErrors.length === 0}
							items={loginErrors}/>
						<div className='my-4 flex gap-4 justify-center'>
							<Button.Action
								type='submit'
								disabled={isLoading}
								className='flex-grow'>
								LOGIN
							</Button.Action>
							<Button
								disabled={isLoading}
								className='flex-grow'>
								SIGN UP
							</Button>
						</div>
						<div className='m-4 flex gap-4 justify-center'>
							{/* <AuthProvider.Facebook onAuth={()=>{}}/> */}
							<AuthProvider.Google onAuth={()=>{}}/>
							{/* <AuthProvider.Twitter onAuth={()=>{}}/> */}
							{/* <AuthProvider.Github onAuth={()=>{}}/> */}
						</div>
					</form>
					
				</Section.Blur>
			</div>
		</div>

		</>
	)
}

export default LandingPage