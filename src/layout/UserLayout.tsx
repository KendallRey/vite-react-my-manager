import { Outlet, useLocation, useNavigate } from "react-router-dom"
import useFirebaseAuth from "../firebase/api/auth/AuthHook"
import ErrorPage from "../component/error-page/ErrorPage"
import Sidebar from "../component/sidebar/Sidebar"
import SidebarLink from "../component/sidebar/SidebarLink"
import { FaHome } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { SignOutApi } from "../firebase/api/auth/AuthApi"
import useUserListItem from "../firebase/hooks/UserListItemHook"
import { useMemo, useState } from "react"
import style from './UserLayout.module.scss'

const AuthLayout = () => {

	const { pathname } = useLocation()
	
	const activePath = useMemo(() => {
		const clean_path = pathname.replace("/user","")
		return clean_path
	},[pathname])

	// 
	//#region Redirect User

	const navigate = useNavigate()
	const { user } = useFirebaseAuth({ fallback_to : "/"})
	
	
	//#endregion
	// 

	// 
	//#region UserListItemType

	const { userListItems } = useUserListItem(user?.uid)

	//#endregion
	// 

	// 
	//#region On Navigate

	const onNavigate = (path : string) => {
		navigate(path)
	}

	//#endregion
	// 

	// 
	//#region On Logout

	const onSignOut = async () => {
        await SignOutApi()
    }

	//#endregion
	// 


	// 
	//#region 

	const [expand, setExpand] = useState(true)

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
		<>
		<Sidebar
			expand={expand}
			footer={
				<SidebarLink.Danger
					expand={expand}
					icon={<MdLogout/>}
					title={"Logout"}
					onClick={onSignOut}/>
			}>
			<SidebarLink
				active={activePath === ""}
				expand={expand}
				icon={<FaHome/>}
				title={"Dashboard"}
				onClick={()=>onNavigate("/user")}/>
			<SidebarLink
				expand={expand}
				icon={<FaHome/>}
				title={"Dashboard"}
				onClick={()=>{
					setExpand(prev => !prev)
				}}/>
			{userListItems?.map((item) => {
				return (
					<SidebarLink
						active={activePath === `/${item.id}`}
						key={item.id}
						expand={expand}
						icon={<FaHome/>}
						title={item.title}
						onClick={()=>onNavigate(item.id)}/>
				)
			})}
			
				
			
		</Sidebar>
		<main className={`${style.content} ${expand ? style.expand : style.collapse}`}>
			<Outlet/>
		</main>
		</>
	)
}

export default AuthLayout