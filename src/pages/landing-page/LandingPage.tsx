import Card, { CardContainer } from '../../component/card/Card'
import style from './LandingPage.module.scss'

const LandingPage = () => {

    return (
        <div className={style.container}>
            <CardContainer>
                <Card>TEST</Card>
                <Card>TEST</Card>
                <Card>TEST</Card>
            </CardContainer>
        </div>
    )
}

export default LandingPage