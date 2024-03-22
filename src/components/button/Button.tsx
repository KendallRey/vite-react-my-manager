import style from './Button.module.scss'

type ButtonType = {

} & React.ComponentProps<"button">

const Button = (props : ButtonType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<button className={`${style.button} ${className ?? ""}`}
			type='button'
			{...cleanProps}>
			{children}
		</button>
	)
}

const ButtonAction = (props : ButtonType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<Button className={`${style.action} ${className ?? ""}`}
			type='button'
			{...cleanProps}>
			{children}
		</Button>
	)
}

export default Object.assign(Button, {
	Action : ButtonAction
})

