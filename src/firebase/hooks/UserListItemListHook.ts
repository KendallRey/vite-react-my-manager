import { collection, onSnapshot } from "firebase/firestore";
import { db,  } from "../FirebaseManager";
import UserListItem, { UserListItemType } from "../../object/custom/UserListItemClass";
import { useEffect, useState } from "react";

const useUserListItemList = (userId? : string, collectionId? : string) => {

	const [userListItems, setUserListItems] = useState<UserListItemType[]>()

	useEffect(() => {
	
		if(!userId) return
		if(!collectionId) return

		const collectionRef = collection(db,`col_lists/${userId}/${collectionId}/`)
		
		const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			const list : UserListItemType[] = []
			snapshot.forEach( async (doc) => {
				const _doc = new UserListItem().toDoc(doc)
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