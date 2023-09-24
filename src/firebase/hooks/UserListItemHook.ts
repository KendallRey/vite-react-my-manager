import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import UserListItem, { UserListItemType } from "../../object/custom/UserListItemClass";
import { useEffect, useState } from "react";
import firebaseApp from "../FirebaseManager";

const db = getFirestore(firebaseApp)

const useUserListItem = (userId? : string) => {

	const [userListItems, setUserListItems] = useState<UserListItemType[]>()

	useEffect(() => {
	
		if(!userId) return

		const collectionRef = collection(db,`col_users/${userId}/col_lists/`)
		const q = query(collectionRef, where('archived', '==', false))

		const unsubscribe = onSnapshot(q, (snapshot) => {
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
	},[userId])

	return {
		userListItems : userListItems
	}
}

export default useUserListItem