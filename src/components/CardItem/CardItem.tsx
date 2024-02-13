import {Card, Button} from 'antd';
import {CardsType} from "@components/MainContent/MainContent.js";
import styles from './CardItem.module.scss'
export const CardItem  = ({title, linkTitle, icon}: CardsType) => <>
    <Card title={title}  className={styles.cardItem}
        headStyle={{ textAlign: 'center', fontSize: '16px' }}
        bodyStyle={{ textAlign: 'center' }}
        size={'small'}
    >
        <Button icon={icon} type="text" style={{color: "var(--primary-light-6)"}}> {linkTitle} </Button>
    </Card>
</>
