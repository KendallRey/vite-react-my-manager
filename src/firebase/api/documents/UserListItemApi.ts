import { collection, getDocs, getFirestore } from "firebase/firestore";
import UserListItem, { UserListItemType } from "../../../object/custom/UserListItemClass";
import firebaseApp from "../../FirebaseManager";

const db = getFirestore(firebaseApp)

export const GetUserListItemsApi = async (userId : string) => {

	try {
		const collectionRef = collection(db,`col_users/${userId}/col_lists/`)
		
		return await getDocs(collectionRef)
			.then((res) => {
				const list : UserListItemType[] = []
				res.forEach( async (doc) => {
					const _doc = new UserListItem().toDoc(doc)
					const clean_doc = await _doc
					list.push(clean_doc)
				})
				return list
			})
			.catch((err) => {
				console.log("test1",err)
				return []
			})

	}
	catch (err) {
		console.log("test2",err)
	}
}