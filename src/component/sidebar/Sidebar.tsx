import style from './Sidebar.module.scss'

type SidebarType = {
    header? : React.ReactNode
    footer? : React.ReactNode
} & React.ComponentProps<"div">

const Sidebar = (props : SidebarType) => {

    const { 
        header,
        children,
        footer,
        className,
        ...cleanProps
    } = props

    return (
        <div className={`${style.container} ${className ?? ""}`}
            {...cleanProps}>
            {header}
            {children}
            {footer}
        </div>
    )
}

export default Sidebar