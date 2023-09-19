import { UserCredential } from 'firebase/auth'
import { SignInWithFacebook, SignInWithGithub, SignInWithGoogle, SignInWithTwitter } from '../../firebase/api/auth/AuthProviderApi'
import style from './AuthProvider.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa' 

// 
// npm install react-icons --save
// 

type AuthButtonType = {

} & React.ComponentProps<"button">

const AuthButton = (props : AuthButtonType) => {

	const {
		className,
		children,
		...cleanProps
	} = props 

	return (
		<button className={style.button}
			type='button'
			{...cleanProps}>
			{children}
		</button>
	)
}

type CustomAuthButtonType = {
	onAuth : (res : UserCredential | null)=>void
} & Omit<React.ComponentProps<"button">,
	"children">

const AuthButtonGoogle = ( props : CustomAuthButtonType) => {

	const {
		className,
		onClick,
		onAuth,
		...cleanProps
	} = props 

	const OnClick = async (e : RME<HTMLButtonElement>) => {

		if(onClick)
			onClick(e)

		const data = await SignInWithGoogle()
		onAuth(data)
	}

	return (
		<button className={style.button}
			onClick={OnClick}
			type='button'
			{...cleanProps}>
			<FcGoogle/>
		</button>
	)
}

const AuthButtonFacebook = ( props : CustomAuthButtonType) => {

	const {
		className,
		onClick,
		onAuth,
		...cleanProps
	} = props 

	const OnClick = async (e : RME<HTMLButtonElement>) => {

		if(onClick)
			onClick(e)

		const data = await SignInWithFacebook()
		onAuth(data)
	}

	return (
		<button className={`${style.button} ${className ?? ""} ${style.facebook}`}
			onClick={OnClick}
			type='button'
			{...cleanProps}>
			<FaFacebook/>
		</button>
	)
}

const AuthButtonTwitter = ( props : CustomAuthButtonType) => {

	const {
		className,
		onClick,
		onAuth,
		...cleanProps
	} = props 

	const OnClick = async (e : RME<HTMLButtonElement>) => {

		if(onClick)
			onClick(e)

		const data = await SignInWithTwitter()
		onAuth(data)
	}

	return (
		<button className={`${style.button} ${className ?? ""} ${style.twitter}`}
			onClick={OnClick}
			type='button'
			{...cleanProps}>
			<FaTwitter/>
		</button>
	)
}

const AuthButtonGithub = ( props : CustomAuthButtonType) => {

	const {
		className,
		onClick,
		onAuth,
		...cleanProps
	} = props 

	const OnClick = async (e : RME<HTMLButtonElement>) => {

		if(onClick)
			onClick(e)

		const data = await SignInWithGithub()
		onAuth(data)
	}

	return (
		<button className={`${style.button} ${className ?? ""} ${style.github}`}
			onClick={OnClick}
			type='button'
			{...cleanProps}>
			<FaGithub/>
		</button>
	)
}

export default Object.assign(AuthButton, {
	Google : AuthButtonGoogle,
	Facebook : AuthButtonFacebook,
	Twitter : AuthButtonTwitter,
	Github : AuthButtonGithub,
})