import { useLocation, useNavigate } from 'react-router-dom'
import style from './PageHeader.module.scss'
import { useMemo } from 'react'
import React from 'react'

type PageHeaderType = {
	title : string
}

const PageHeader = (props : PageHeaderType) => {

	const {
		title
	} = props

	const navigate = useNavigate()
	const { pathname } = useLocation()

	type RouteType = {
		name : string
		path : string
	}

	const paths = useMemo(() => {
		let routes : RouteType[] = []
		let current_path = ""
		const _paths = pathname.split("/")
		_paths.forEach((item) => {
			if(item.trim() !== ""){
				current_path = current_path.concat(`/${item}`)

				routes.push({
					name : item,
					path : current_path,
				})
			}
		})
		return routes
	},[pathname])

	// 
	//#region on Navigate

	const onNavigate = (path : string) => {
		navigate(path, { relative : "path" })
	}

	//#endregion
	// 

	return (
		<div className={style.container}>
			<h1>{title}</h1>
			<div className={style.routes}>
				{paths.map((item) => {
					return (
						<React.Fragment key={item.path}>
							/
							<button onClick={()=>onNavigate(item.path)}>
								{item.name}
							</button>
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default PageHeader