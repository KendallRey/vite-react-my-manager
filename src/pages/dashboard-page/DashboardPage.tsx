import { SignOutApi } from '../../firebase/api/auth/AuthApi'
import style from './DashboardPage.module.scss'

const DashboardPage = () => {

    const onSignOut = async () => {
        await SignOutApi()
    }

    return (
        <div className={style.container}>
            <button onClick={onSignOut}>
                Sign Out
            </button>
        </div>
    )
}

export default DashboardPage