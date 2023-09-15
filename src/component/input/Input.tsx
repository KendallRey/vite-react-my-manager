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

export default Object.assign(Input, {
    Money : InputMoney
})