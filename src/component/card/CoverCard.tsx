import { ReactNode } from 'react'
import style from './CoverCard.module.scss'

type CoverCardType = {
	title? : string
	children? : ReactNode
	cover? : ReactNode
	active? : boolean
	onClick? : React.MouseEventHandler
}

const CoverCard = ({
	title,
	children,
	cover,
	active,
	onClick,
} : CoverCardType) => {

	return (
		<div className={style.card}
			onClick={onClick}>
			{cover && 
			<div className={`${style.cover} ${active ? style.unhide : style.hide}`}>
				{cover}
			</div>
			}
			<div className={`${style.content} ${active ? style.up : style.down}`}>
				<div className={style.title}>
					{title}
					<div>
						<hr/>
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}

export default CoverCard

type  CoverCardContainerType = {
	children? : ReactNode
}

export const  CoverCardContainer = ({
	children,
} :  CoverCardContainerType) => {

	return (
		<div className={style.container}>
			{children}
		</div>
	)
}