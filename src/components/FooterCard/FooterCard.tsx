import {Button, Card} from "antd";
import {AndroidFilled, AppleFilled} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const FooterCard = () => {
    const breakpoint = useBreakpoint();

    return <>
        <Card
            bodyStyle={{padding: "12px 0", textAlign: 'center'}}
            headStyle={{textAlign: breakpoint.xs ? 'center' : "left"}}
            title={
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
            <Button size={'medium'} type={'link'}
                    style={{color: ' var(--character-light-title-85)'}}
                    icon={<AndroidFilled/>}>
                Android OS
            </Button>
            <Button size={'medium'} type={'link'}
                    style={{color: ' var(--character-light-title-85)'}}
                    icon={<AppleFilled/>}>
                Apple OS
            </Button>
        </Card>
    </>
}
