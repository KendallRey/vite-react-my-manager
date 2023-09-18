import { Outlet } from "react-router-dom"
import style from './Layout.module.scss'

const Layout = () => {

	return (
		<main className={style.main}>
			<Outlet/>
		</main>
	)
}

export default Layout