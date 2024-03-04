import styles from './FooterContent.module.scss'
import {Button} from "antd";
import {FooterCard} from "@components/FooterCard/FooterCard";
import {history} from "@redux/configure-store";


const handlerNavigate = () => {
    history.push('feedback')

}
export const FooterContent = () => <div className={styles.container}>
    <Button type={'link'} size={'large'} onClick={handlerNavigate} style={{color: "var(--primary-light-6)"}}>Смотреть
        отзывы</Button>
    <div className={styles.card}><FooterCard/></div>
</div>
