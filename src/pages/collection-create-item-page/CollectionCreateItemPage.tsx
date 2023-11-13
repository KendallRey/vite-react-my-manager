import { useParams } from 'react-router-dom'
import PageHeader from '../../component/page-header/PageHeader'
import style from './CollectionCreateItemPage.module.scss'
import useFirebaseAuth from '../../firebase/api/auth/AuthHook'
import useUserListItemList from '../../firebase/hooks/UserListItemListHook'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'
import Grid from '../../component/grid/Grid'
import { useState } from 'react'
import ListItem, { ListItemCreateType, ListItemType } from '../../object/custom/ListItemClass'
import { serverTimestamp } from 'firebase/firestore'
import { CreateListItemApi } from '../../firebase/api/documents/ListItemApi'

const CollectionCreateItemPage = () => {

	const { collection_id } = useParams()
	const { user } = useFirebaseAuth({ fallback_to : "/" })

	const { userListItems } = useUserListItemList(user?.uid, collection_id)

	console.log("",userListItems)

	// 
	//#region on Submit

	const [item, setItem] = useState<ListItemCreateType>({
		title : "da",
		thumbnail : "",
		description : "",
	})

	const onChangeItem = (e : RCE<HTMLInputElement>) => {
		const { name, value } = e.target
		setItem(prev => ({...prev, [name] : value}))
	}

	const onSubmitCreate = async (e : React.FormEvent) => {
		e.preventDefault()
		
		if(!user) return
		if(!collection_id) return
		const list_item = new ListItem()
		console.log("test1",item.title)
		const data_to_post = await list_item.createDoc(user.uid, item)
		console.log("test2",data_to_post)
		if(data_to_post.status === "SUCCESS"){
			await CreateListItemApi(user.uid, collection_id, data_to_post.data)
		}
		if(data_to_post.status === "ERROR"){
			console.log(data_to_post.errors)
		}
		
	}


	//#endregion
	// 

	return (
		<div className={style.container}>
			<PageHeader title='Collection'/>
			<Grid.Card>
				<Grid.Title>Create Item Form</Grid.Title>
				<form id='submit-create-form'
					onSubmit={onSubmitCreate}>
					<Input.Text
						required
						name='title'
						minLength={3}
						value={item.title}
						onChange={onChangeItem}
						label='Title' />
					<Input.Text label='Title' />
					<Input.Text label='Title' />
					<Input.Text label='Title' />
					<Input.Text label='Title' />
					<Input.Text label='Title' />
					<Button.Action onClick={onSubmitCreate}>
						Create
					</Button.Action>
				</form>
			</Grid.Card>
		</div>
	)
}

export default CollectionCreateItemPage