import { collection, doc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import UserListItem, { UserListItemType } from "../../../object/custom/UserListItemClass";
import firebaseApp from "../../FirebaseManager";

const db = getFirestore(firebaseApp)

export const CreateListItemApi = async (userId : string, collectionId : string, data : any) => {

	try {
        const collectionRef = collection(db,`col_lists/${userId}/${collectionId}/`)
		const docRef = doc(collectionRef)
		
		return await setDoc(docRef,data)
			.then((res) => {
				console.log("test0",res)
				return res
			})
			.catch((err) => {
				console.log("test1",err)
				
			})

	}
	catch (err) {
		console.log("test2",err)
	}
}