import style from './Section.module.scss'

type SectionType = {

} & React.ComponentProps<"section">

const Section = ( props : SectionType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<section className={`${style.section} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</section>
	)
}

const BlurSection = (props : SectionType) => {

	const {
		className,
		children,
		...cleanProps
	} = props

	return (
		<section className={`${style.section} ${style.blur} ${className ?? ""}`}
			{...cleanProps}>
			{children}
		</section>
	)
}

export default Object.assign(Section, {
	Blur : BlurSection
})