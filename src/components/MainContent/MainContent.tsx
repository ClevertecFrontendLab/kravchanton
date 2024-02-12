import React from 'react';
import styles from './MainContent.module.scss'
import {CalendarOutlined, HeartFilled, IdcardOutlined} from "@ant-design/icons";
import {CardItem} from "@components/CardItem/CardItem";
import {ReactNode} from "react/ts5.0";


export type CardsType = {
    title: string;
    linkTitle: string;
    icon: ReactNode;
};
const cards: CardsType[] = [
    {
        title: 'Расписать тренировки',
        linkTitle: 'Тренировки',
        icon: <HeartFilled/>,
    }, {
        title: 'Назначить календарь',
        linkTitle: 'Календарь',
        icon: <CalendarOutlined/>,
    }, {
        title: 'Заполнить профиль',
        linkTitle: 'Профиль',
        icon: <IdcardOutlined/>,
    },
]
export const MainContent = () => <>
    <div className={styles.contentWrap}>
        <div className={styles.contentItem}>
            <p>
                С CleverFit ты сможешь:
            </p>
            <ul>
                <li>
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                </li>
                <li>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои
                    результаты с нормами и рекордами;
                </li>
                <li>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и
                    отзывы о тренировках;
                </li>
                <li>
                    — выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям и советам профессиональных тренеров.
                </li>
            </ul>
        </div>
        <div className={styles.contentItem}>
            <h3 className={styles.text}> CleverFit — это не просто приложение, а твой личный
                помощник
                в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!</h3>
        </div>
        <div className={styles.cardsWrapper}>
            {cards.map((s) => <CardItem title={s.title}
                                        linkTitle={s.linkTitle}
                                        icon={s.icon}/>)}
        </div>
    </div>
</>
