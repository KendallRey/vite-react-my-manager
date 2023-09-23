import style from './Sidebar.module.scss'

type SidebarType = {
    header? : React.ReactNode
    footer? : React.ReactNode
    expand : boolean
} & React.ComponentProps<"div">

const Sidebar = (props : SidebarType) => {

    const { 
        header,
        children,
        footer,
        className,
        expand,
        ...cleanProps
    } = props

    return (
        <div className={`${style.container} ${expand ? style.expand : style.collapse} ${className ?? ""}`}
            {...cleanProps}>
            {header}
            <div>
                {children}
            </div>
            {footer}
        </div>
    )
}

export default Sidebar