import style from './Checkbox.module.scss'

type CheckboxType = {
    label?: string;
} & Omit<React.ComponentProps<'input'>, 'type'>;

const Checkbox = (props : CheckboxType) => {

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
        type='checkbox'
        className={`${style.checkbox} ${className ?? ""}`}
        required={required}
        {...cleanProps}/>
    </div>
    )
}
export default Checkbox;