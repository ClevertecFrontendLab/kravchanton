import {Menu} from "antd";
import {CalendarOutlined, HeartFilled, IdcardOutlined, TrophyFilled} from "@ant-design/icons";
import {ReactNode} from "react";


export type ItemType = {
    key: string
    icon: ReactNode
    label: string
}


const items: ItemType[] = [
    {
        key: "1",
        icon: <CalendarOutlined style={{ color: 'var(--primary-light-9)' }} />,
        label: 'Календарь',
    },
    {
        key: "2",
        icon: <HeartFilled style={{ color: 'var(--primary-light-9)' }} />,
        label: 'Тренировки',
    },
    {
        key: "3",
        icon: <TrophyFilled style={{ color: 'var(--primary-light-9)' }} />,
        label: 'Достижения',
    },
    {
        key: "4",
        icon: <IdcardOutlined style={{ color: 'var(--primary-light-9)' }} />,
        label: 'Профиль',
    },
]

export const NavigationMenu = () => {


    return <>
        <Menu
            theme='light'
            mode='inline'
            items={items}
        /></>
}
