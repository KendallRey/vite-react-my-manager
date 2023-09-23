import { InferType, date, object, string } from "yup";

export default class Item {

	private created_at
	private updated_at
	private created_by
	private updated_by

	constructor (item? : ItemType){

		if(item){
			this.created_at = item.created_at
			this.updated_at = item.updated_at
			this.created_by = item.created_by
			this.updated_by = item.updated_by 
		}
		
	}

	async data () {
		const data = {
			created_at : this.created_at,
			updated_at : this.updated_at,
			created_by : this.created_by,
			updated_by : this.updated_by,
		}
		return await ItemSchema.validate(data)
	}

	async set (item : ItemType){
		this.created_at = item.created_at
		this.updated_at = item.updated_at
		this.created_by = item.created_by
		this.updated_by = item.updated_by 
	}
}


export const ItemSchema = object({
	id : 
		string()
		.required(),
	created_at : 
		date()
		.default(new Date(2000, 1, 1))
		.required(),
	updated_at : 
		date()
		.default(new Date(2000, 1, 1))
		.required(),
	created_by : 
		string()
		.nullable()
		.default("default")
		.required(),
	updated_by :
		string()
		.nullable()
		.default("default")
		.required(),
})

export type ItemType = InferType<typeof ItemSchema>

