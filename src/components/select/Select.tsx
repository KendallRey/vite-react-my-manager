import { ReactNode } from 'react';
import style from './Select.module.scss';

type SelectType = {
	label? : string
	children? : ReactNode
} & React.ComponentProps<"select">

const Select = ( props : SelectType) => {

	const {
		id,
		label,
		className,
		required,
		children,
		...cleanProps
	} = props

	return (
		<div
			className={style.input_container}>
		<label htmlFor={id}
			className={`${required ? style.required : ""}`}>
			{label}
		</label>
		<select id={id}
			className={`${style.select} ${className ?? ""}`}
			required={required}
			{...cleanProps}>
			{children}
		</select>
		</div>
	)
}

export default Select