import style from './Flex.module.scss'

type FlexType = {

} & React.ComponentProps<"div">

const Flex = (props : FlexType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<div className={`${style.flex} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</div>
	)
}
const FlexCard = (props : FlexType) => {

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

const FlexTitle = (props : FlexType) => {

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

export default Object.assign(Flex, {
    Card : FlexCard,
	Title : FlexTitle,
})