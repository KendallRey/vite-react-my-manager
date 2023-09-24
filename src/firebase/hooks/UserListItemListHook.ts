import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import UserListItem, { UserListItemType } from "../../object/custom/UserListItemClass";
import { useEffect, useState } from "react";
import firebaseApp from "../FirebaseManager";
import ListItem, { ListItemType } from "../../object/custom/ListItemClass";

const db = getFirestore(firebaseApp)

const useUserListItemList = (userId? : string, collectionId? : string) => {

	const [userListItems, setUserListItems] = useState<ListItemType[]>()

	useEffect(() => {
	
		if(!userId) return
		if(!collectionId) return

		const collectionRef = collection(db,`col_lists/${userId}/${collectionId}/`)
		const q = query(collectionRef, where('archived', '==', false))

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const list : ListItemType[] = []
			snapshot.forEach( async (doc) => {
				const _doc = new ListItem().toDoc(doc)
				const clean_doc = await _doc
				list.push(clean_doc)
			})
			setUserListItems(list)
		})

		return () => {
			unsubscribe()
		}
	},[userId, collectionId])

	return {
		userListItems : userListItems
	}
}

export default useUserListItemList