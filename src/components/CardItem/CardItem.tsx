import {Card, Button} from 'antd';
import {CardsType} from "@components/MainContent/MainContent.js";
import styles from './CardItem.module.scss'
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const CardItem: React.FC = ({title, linkTitle, icon}: CardsType) => {
    const breakpoint = useBreakpoint();
    const headStyles = {
        textAlign: breakpoint.xs ? 'center' : 'start',
        padding: "0 24px",
        fontSize: '16px'
    }
    return <>
        <Card title={title} className={styles.cardItem}
              headStyle={headStyles}
              bodyStyle={{textAlign: 'center',}}
              size='small'
        >
            <Button icon={icon} type="text"
                    style={{color: "var(--primary-light-6)"}}> {linkTitle} </Button>
        </Card>
    </>
}
