import {Button, Card} from "antd";
import {AndroidFilled, AppleFilled} from "@ant-design/icons";
import styles from './FooterCard.module.scss'

export const FooterCard = () => <>
    <Card  bodyStyle={{padding: "12px 0"}} title={
        <div>
            <Button
                style={{color: "var(--primary-light-6)", padding: "0px"}}
                type={'link'}
                size={'large'}
            >
                Скачать на телефон
            </Button>
            <p style={{fontSize: '14px', color: 'var(--character-light-secondary-45)'}}>
                Доступно в PRO-тарифе
            </p>
        </div>
    }
    >
        <Button size={'medium'} type={'link'} style={{color: ' var(--character-light-title-85)'}} icon={<AndroidFilled/>}>
            Android OS
        </Button>
        <Button size={'medium'} type={'link'} style={{color: ' var(--character-light-title-85)'}} icon={<AppleFilled/>}>
            Apple OS
        </Button>
    </Card>
</>
