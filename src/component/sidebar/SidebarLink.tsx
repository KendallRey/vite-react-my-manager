import { ReactNode } from 'react'
import style from './SidebarLink.module.scss'

type SidebarLinkType = {
	icon : ReactNode
	title : string
	onClick : (e : RME<HTMLButtonElement>) => void
	expand : boolean
	active? : boolean
}

const SidebarLink = ( props : SidebarLinkType ) => {

	const { 
		icon,
		title,
		onClick,
		expand,
		active,
	} = props

	return (
		<button onClick={onClick}
			disabled={active}
			className={`${style.sidebar_link} ${active ? style.active : style.inactive} ${expand ? style.expand : style.collapse}`}>
			{icon}
			<span>{title}</span>
		</button>
	)
}

type SidebarLinkDangerType = {
	
} & Omit<SidebarLinkType, "active">

const SidebarLinkDanger = ( props : SidebarLinkDangerType ) => {

	const { 
		icon,
		title,
		onClick,
		expand,
	} = props

	return (
		<button onClick={onClick}
			className={`${style.sidebar_link} ${style.danger} ${expand ? style.expand : style.collapse}`}>
			{icon}
			<span>{title}</span>
		</button>
	)
}

export default Object.assign(SidebarLink, {
	Danger : SidebarLinkDanger,
})