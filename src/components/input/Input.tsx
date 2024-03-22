import style from './Input.module.scss'

type InputType = {

} & React.ComponentProps<"input">

const Input = (props : InputType) => {
	const {
		className,
		...cleanProps
	} = props

	return (
		<input
		className={`${style.input} ${className ?? ""}`}
		{...cleanProps}/>
	)
}

type InputMoneyType = {

} & React.ComponentProps<"input">

const InputMoney = ( props : InputMoneyType) => {

	const {
		className,
		...cleanProps
	} = props

	return (
		<input
			className={`${style.input} ${className ?? ""}`}
			{...cleanProps}/>
	)
}

type InputTextType = {
	label? : string
} & React.ComponentProps<"input">

const InputText = ( props : InputTextType) => {

	const {
		id,
		label,
		className,
		required,
		...cleanProps
	} = props

	return (
		<div
			className={style.input_container}>
		<label htmlFor={id}
			className={`${required ? style.required : ""}`}>
			{label}
		</label>
		<input id={id}
			className={`${style.input} ${className ?? ""}`}
			required={required}
			{...cleanProps}/>
		</div>
	)
}

export default Object.assign(Input, {
	Money : InputMoney,
	Text : InputText,
})