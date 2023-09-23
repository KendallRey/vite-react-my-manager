import { Outlet } from "react-router-dom"
import useFirebaseAuth from "../firebase/api/auth/AuthHook"
import ErrorPage from "../component/error-page/ErrorPage"
import Sidebar from "../component/sidebar/Sidebar"
import SidebarLink from "../component/sidebar/SidebarLink"
import { FaHome } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { SignOutApi } from "../firebase/api/auth/AuthApi"
import useUserListItem from "../firebase/hooks/UserListItemHook"
import { useState } from "react"

const AuthLayout = () => {

	// 
	//#region Redirect User

	const { user } = useFirebaseAuth({ fallback_to : "/"})

	//#endregion
	// 

	// 
	//#region UserListItemType

	const { userListItems } = useUserListItem(user?.uid)


	
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

	const [expand] = useState(true)

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
				expand={expand}
				icon={<FaHome/>}
				title={"Dashboard"}
				onClick={()=>{}}/>
			{userListItems?.map((item) => {
				return (
					<SidebarLink
						key={item.id}
						expand={expand}
						icon={<FaHome/>}
						title={item.title}
						onClick={()=>{}}/>
				)
			})}
			
				
			
		</Sidebar>
		
			<Outlet/>
		
		</>
	)
}

export default AuthLayout