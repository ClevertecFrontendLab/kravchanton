import {Menu} from "antd";
import {CalendarOutlined, HeartFilled, IdcardOutlined, TrophyFilled} from "@ant-design/icons";
import {ReactNode} from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import styles from './NavigationMenu.module.scss'

export type ItemType = {
    key: string
    icon: ReactNode
    label: string
}
export const NavigationMenu: React.FC = () => {
    const breakpoint = useBreakpoint();
    const items: ItemType[] = [
        {
            key: "1",
            icon: breakpoint.xs ? ('') : (<CalendarOutlined style={{ color: 'var(--primary-light-9)' }} />),
            label: 'Календарь',
        },
        {
            key: "2",
            icon: breakpoint.xs ? ('') : (<HeartFilled style={{ color: 'var(--primary-light-9)' }} />),
            label: 'Тренировки',
        },
        {
            key: "3",
            icon: breakpoint.xs ? ('') : (<TrophyFilled style={{ color: 'var(--primary-light-9)' }} />),
            label: 'Достижения',
        },
        {
            key: "4",
            icon: breakpoint.xs ? ('') : (<IdcardOutlined style={{ color: 'var(--primary-light-9)' }} />),
            label: 'Профиль',
        },
    ]


    return <>
        <Menu
            className={styles.menu}
            theme='light'
            mode='inline'
            items={items}
        /></>
}
