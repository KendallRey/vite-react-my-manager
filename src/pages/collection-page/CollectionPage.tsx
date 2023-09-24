import Card, { CardContainer } from '../../component/card/Card'
import PageHeader from '../../component/page-header/PageHeader'
import style from './CollectionPage.module.scss'

const CollectionPage = () => {

    return (
        <div className={style.container}>
            <PageHeader title='Collection'/>
            <CardContainer>
                <Card>ADw</Card>
                <Card>ADwdaw</Card>
                <Card>ADwdawdaw</Card>
            </CardContainer>
        </div>
    )
}

export default CollectionPage