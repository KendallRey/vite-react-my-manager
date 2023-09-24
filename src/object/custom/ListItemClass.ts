import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Item, { ItemCreateSchema, ItemSchema } from "../ItemClass";

export default class ListItem extends Item {

	private title
	private thumbnail
	private description

	constructor(item? : ListItemType){
		super(item)
		if(item){
			this.title = item.title
			this.thumbnail = item.thumbnail
			this.description = item.description
		}
	}

	async data(){
		const _data = await super.data()
		const data = {
			..._data,
			title : this.title,
			thumbnail : this.thumbnail,
			description : this.description
		}
		return await ListItemSchema.validate(data)
	}

	// 
	//#endregion Firebase

	async toDoc(item : QueryDocumentSnapshot<DocumentData>) {
		const doc_data = item.data()
		const created_at = docDateParse(doc_data.created_at)
		const updated_at = docDateParse(doc_data.updated_at)
		const data = {
			...doc_data,
			id : item.id,
			created_at,
			updated_at,
		}
		return await ListItemSchema.validate(data)
	}

	async createDoc(user_id : string, data : any) {
		try {
			const meta_data = await super.setCreateMetadata(user_id)
			const clean_data = await ListItemCreateSchema.validate(data)
			const data_to_post = {
				...meta_data,
				...clean_data,
			}
			return {
				status : "SUCCESS" as "SUCCESS" | "ERROR",
				data : data_to_post,
			}
		}
		catch (err : any) {
			return {
				status : "ERROR" as "SUCCESS" | "ERROR",
				errors : err.errors as string[]
			}
		}
	}

	//#endregion
	// 
}

import { InferType, object, string } from "yup";
import { docDateParse } from "../../utils/DocDate";

export const ListItemSchema = object({
	title :
		string()
		.required("Title is required!")
		.max(12, "Too long, max 12 characters")
		.min(3, "Too short, min 3 characters"),
	thumbnail : 
		string(),
	description :
		string()
		.max(50, "Too long, max : 50 characters"),
}).concat(ItemSchema)

export const ListItemCreateSchema = object({
	title :
		string()
		.required("Title is required!")
		.max(12, "Too long, max 12 characters")
		.min(3, "Too short, min 3 characters"),
	thumbnail : 
		string(),
	description :
		string()
		.max(50, "Too long, max : 50 characters"),
})

export type ListItemCreateType = InferType<typeof ListItemCreateSchema>
export type ListItemType = InferType<typeof ListItemSchema>