import { useNavigate, useParams } from 'react-router-dom'
import Card, { CardContainer } from '../../component/card/Card'
import PageHeader from '../../component/page-header/PageHeader'
import style from './CollectionPage.module.scss'
import useFirebaseAuth from '../../firebase/api/auth/AuthHook'
import useUserListItemList from '../../firebase/hooks/UserListItemListHook'
import Button from '../../component/button/Button'
import Grid from '../../component/grid/Grid'
import { DeleteUserListItemsApi } from '../../firebase/api/documents/UserListItemApi'

const CollectionPage = () => {

	// 
	//#region Hooks

	const { collection_id } = useParams()
	const navigate = useNavigate()

	const { user } = useFirebaseAuth({ fallback_to : "/" })
	const { userListItems } = useUserListItemList(user?.uid, collection_id)

	//#endregion
	// 


	//
	//#region Functions

	const onCreate = () => {
		navigate("create")
	}

	const onDelete = async () => {
		if(!user) return
		if(!collection_id) return

		const is_deleted = await DeleteUserListItemsApi(user.uid, collection_id)

		if(is_deleted)
			navigate('/user')
		
	}

	//#endregion
	// 

	console.log("", userListItems)

	return (
		<div className={style.container}>
			<PageHeader title='Collection'/>
			<Grid.Card>
				<Grid.Title>
					Items
					<Button.Action
						className='my-2'
						onClick={onCreate}>
						Create
					</Button.Action>
				</Grid.Title>
				<Button.Danger onClick={onDelete}>
					Delete
				</Button.Danger>
			</Grid.Card>

			{userListItems?.map((item) => {
				return (
				<Grid.Card key={item.id}>
					<Grid.Title>
						{item.title}
						<Button.Action
							className='my-2'
							onClick={onCreate}>
							Create
						</Button.Action>
					</Grid.Title>
					<Button.Danger onClick={onDelete}>
						Delete
					</Button.Danger>
				</Grid.Card>
				)
			})}
			
		</div>
	)
}

export default CollectionPage