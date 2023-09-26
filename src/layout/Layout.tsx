import { Outlet } from "react-router-dom"
import style from './Layout.module.scss'
import useFirebaseAuth from "../firebase/api/auth/AuthHook"
import ErrorPage from "../component/error-page/ErrorPage"

const Layout = () => {

	// 
	//#region Redirect User

	const { user } = useFirebaseAuth({ redirect : "/user"})

	//#endregion
	// 

	console.log("L", user)
	console.log("1", user)

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