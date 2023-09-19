export const REGEX_MONEY_ONLY = /[^0-9.]/g
export const REGEX_ALPHANUMERIC_ONLY = /^[a-zA-Z0-9\s,.-]*$/

export const CleanText = (value : any, defaultValue? : string) => {
	if(typeof(value) === 'string')
		return value.replace(/[^a-zA-Z0-9.@]+/g, "")

	try{
		let parse_value = value.toString() as string
		return parse_value.replace(/[^a-zA-Z0-9.@]+/g, "")
	}
	catch {
		return defaultValue ?? ""
	}
}

const NOT_EMAIL = /[a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9-.]+\.([a-zA-Z]{2,6})/g

export const CleanEmail = (value : any, defaultValue? : string) => {
	if(typeof(value) === 'string')
		return value.replace(NOT_EMAIL, "")

	try{
		let parse_value = value.toString() as string
		return parse_value.replace(NOT_EMAIL, "")
	}
	catch {
		return defaultValue ?? ""
	}
	
}