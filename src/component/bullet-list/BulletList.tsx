import { useEffect, useRef, useState } from 'react'
import style from './BulletList.module.scss'

type BulletListType = {
	items : string[]
	hide : boolean

} & Omit<React.ComponentProps<"div">, "children">

const BulletList = (props : BulletListType) => {

	const {
		items,
		hide,
		className,
		style : _style,
		...cleanProps
	} = props

	const containerRef = useRef<HTMLDivElement>(null)

	const [maxHeight, setMaxHeight] = useState(containerRef?.current?.scrollHeight ?? "")

	useEffect(() => {

		const interval = setTimeout(()=>{
			if(hide){
				setMaxHeight("0px")
				return
			}
			setMaxHeight(`${items.length * 20}px`)
		}, 200)
		return () => {
			clearTimeout(interval)
		}

	},[items , hide])

	return (
		<div
			ref={containerRef}
			style={{ ..._style, height: maxHeight }}
			className={`${style.container} ${className ?? ''}`}
			{...cleanProps}>
			<ul>
				{items.map((item) => {
					return (
						<li key={item}
							style={{height : "20px"}}>
							{item}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const BulletListError = (props : BulletListType) => {

	return (
		<BulletList
			className={style.error}
			{...props}/>
	)
}


export default Object.assign(BulletList,{
	Error : BulletListError,
})