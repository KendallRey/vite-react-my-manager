import { Outlet } from "react-router-dom"
import useFirebaseAuth from "../firebase/api/auth/AuthHook"
import ErrorPage from "@/components/error-page/ErrorPage"

const AuthLayout = () => {

	// 
	//#region Redirect User

	const { user } = useFirebaseAuth({ fallback_to : "/"})

	//#endregion
	// 

	if(user === undefined)
		return (
			<ErrorPage message='...'/>
		)

	if(user === null)
		return (
			<ErrorPage
				code={402}
				message='Session Expired'/>
		)

	return (
		<div>
			<Outlet/>
		</div>
	)
}

export default AuthLayout