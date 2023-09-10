import { ReactNode } from 'react'
import style from './BoxCard.module.scss'

type BoxCardType = {
	title? : ReactNode
	children? : ReactNode
}

const BoxCard = ({
	title,
	children,
} : BoxCardType) => {

	const onMouseMove = (e : RME<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
		e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
	}

	return (
		<div className={style.card}
			onMouseMove={onMouseMove}>
			<div className={style.card_content}>
				{title && 
				<div className={style.title}>
					{title}
					<hr/>
				</div>
				}
				{children}
			</div>
		</div>
	)
}

type BoxCardContainerType = {
	children ? : ReactNode
}

export const BoxCardContainer = ({
	children,
} : BoxCardContainerType) => {

	return (
		<div className={style.container}>
			{children}
		</div>
	)
}

export default BoxCard