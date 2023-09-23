import { collection, onSnapshot } from "firebase/firestore";
import { db,  } from "../FirebaseManager";
import UserListItem, { UserListItemType } from "../../object/custom/UserListItemClass";
import { useEffect, useState } from "react";

const useUserListItem = (userId? : string) => {

	const [userListItems, setUserListItems] = useState<UserListItemType[]>()

	useEffect(() => {
	
		if(!userId) return

		const collectionRef = collection(db,`col_users/${userId}/col_lists/`)
		
		const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			const list : UserListItemType[] = []
			snapshot.forEach( async (doc) => {
				const _doc = new UserListItem().toDoc(doc)
				const clean_doc = await _doc
				list.push(clean_doc)
			})
			// return list
			console.log("test",list)
			setUserListItems(list)
		})

		return () => {
			unsubscribe()
		}
	},[])

	return {
		userListItems : userListItems
	}
}

export default useUserListItem