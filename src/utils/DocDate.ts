export const docDateParse = (value : any) => {
	if(!value) return null
	try {
		return value.toDate() as Date
	}
	catch{
		return null
	}
}