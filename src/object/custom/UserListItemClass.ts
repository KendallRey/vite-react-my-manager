import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Item, { ItemSchema } from "../ItemClass";

export default class UserListItem extends Item {

	private title
	private icon
	private description

	constructor(item? : UserListItemType){
		super(item)
		if(item){
			this.title = item.title
			this.icon = item.icon
			this.description = item.description
		}
	}

	async data(){
		const _data = await super.data()
		const data = {
			..._data,
			title : this.title,
			icon : this.icon,
			description : this.description
		}
		return await UserListItemSchema.validate(data)
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
		return await UserListItemSchema.validate(data)
	}

	//#endregion
	// 
}

import { InferType, object, string } from "yup";
import { docDateParse } from "../../utils/DocDate";

export const UserListItemSchema = object({
	title :
		string()
		.required("Title is required!")
		.max(12, "Too long, max 12 characters")
		.min(3, "Too short, min 3 characters"),
	icon : 
		string()
		.required("Icon is required!"),
	description :
		string()
		.max(50, "Too long, max : 50 characters"),
}).concat(ItemSchema)

export type UserListItemType = InferType<typeof UserListItemSchema>