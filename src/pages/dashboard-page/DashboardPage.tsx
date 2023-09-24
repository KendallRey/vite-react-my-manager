import { AiFillClockCircle } from 'react-icons/ai'
import Grid from '../../component/grid/Grid'
import style from './DashboardPage.module.scss'
import PieChart from '../../component/chart/pie-chart/PieChart'
import BulletList from '../../component/bullet-list/BulletList'
import { useNavigate } from 'react-router-dom'
import useFirebaseAuth from '../../firebase/api/auth/AuthHook'
import useUserListItem from '../../firebase/hooks/UserListItemHook'
import Flex from '../../component/flex/Flex'
import PageHeader from '../../component/page-header/PageHeader'

const DATA = {
	labels : ['red','blue','yellow'],
	values : [ 12, 41, 54, ],
	colors : ['#ff7675','#74b9ff','#55efc4']
}

const DashboardPage = () => {

	// 
	//#region Redirect User

	const navigate = useNavigate()
	const { user } = useFirebaseAuth({ fallback_to : "/"})
	
	//#endregion
	// 

	const { userListItems } = useUserListItem(user?.uid)

	

	return (
		<div className={style.container}>
			<PageHeader title='Dashboard'/>
			<Flex>
				<Flex.Card>
					<Flex.Title>
						Collections
						<AiFillClockCircle/>
					</Flex.Title>
					<PieChart data={DATA}></PieChart>
					<BulletList items={[
						"1","2","4",'5'
					]} hide={false}/>
				</Flex.Card>
				<Flex.Card>sas</Flex.Card>
				<Flex.Card>sas</Flex.Card>
			</Flex>
		</div>
	)
}

export default DashboardPage