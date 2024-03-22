import { Outlet } from "react-router-dom"
import style from './Layout.module.scss'
import useFirebaseAuth from "@/firebase/api/auth/AuthHook"
import ErrorPage from "@/components/error-page/ErrorPage"

const Layout = () => {

	// 
	//#region Redirect User

	const { user } = useFirebaseAuth({ redirect : "/user"})

	//#endregion
	// 

	console.log("L", user)

	if(user === undefined)
		return (
			<ErrorPage message='...'/>
		)

	return (
		<main className={style.main}>
			<Outlet/>
		</main>
	)
}

export default Layout