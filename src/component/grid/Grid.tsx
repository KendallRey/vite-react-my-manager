import style from './Grid.module.scss'

type GridType = {

} & React.ComponentProps<"div">

const Grid = (props : GridType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<div className={`${style.grid} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</div>
	)
}

const GridCard = (props : GridType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<div className={`${style.card} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</div>
	)
}

const GridTitle = (props : GridType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<>
		<div className={`${style.title} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</div>
		<hr/>
		</>
	)
}


export default Object.assign(Grid,{
	Card : GridCard,
	Title : GridTitle,
})