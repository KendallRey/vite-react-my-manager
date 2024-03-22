import { ReactNode } from 'react'
import style from './CollapsibleCard.module.scss'

type CollapsibleCardType = {
	title? : string
	children? : ReactNode
}

const CollapsibleCard = ({
	title,
	children
} : CollapsibleCardType) => {
	
	return (
		<div className={style.card}>
			{title && 
			<div className={style.title}>
				{title}
				<hr/>
			</div>
			}
			{children}
		</div>
	)
}

export default CollapsibleCard

type CollapsibleCardContainerType = {
	children? : ReactNode
}

export const CollapsibleCardContainer = ({
	children,
} : CollapsibleCardContainerType) => {

	return (
		<div className={style.container}>
			{children}
		</div>
	)
}