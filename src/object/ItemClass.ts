import { serverTimestamp } from "firebase/firestore";
import { InferType, bool, date, object, string } from "yup";

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

	// 
	//#region Firebase

	async setCreateMetadata (user_id : string) {
		const data = {
			created_by : user_id,
			updated_by : null,
			created_at : serverTimestamp(),
			updated_at : null,
			archived : false,
		}
		return await ItemCreateSchema.validate(data)
	}

	setUpdateMetadata (user_id : string) {
		const data = {
			updated_by : user_id,
			updated_at : serverTimestamp(),
		}
		return data
	}

	//#endregion
	// 
}


export const ItemSchema = object({
	id : 
		string()
		.required(),
	created_at : 
		date()
		.default(new Date(2000, 1, 1))
		.required(),
	created_by : 
		string()
		.nullable()
		.default("default")
		.required(),
	updated_at : 
		date()
		.nullable(),
	updated_by :
		string()
		.nullable(),
	archived :
		bool()
		.required(),
})

export const ItemCreateSchema = object({
	created_at : 
		object(),
	created_by : 
		string()
		.required(),
	archived : 
		bool()
		.required(),
})

export type ItemType = InferType<typeof ItemSchema>
export type ItemCreateType = InferType<typeof ItemCreateSchema>

