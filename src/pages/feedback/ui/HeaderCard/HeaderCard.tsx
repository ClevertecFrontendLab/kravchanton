import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import styles from './HeaderCard.module.scss'
import {FeedbackAvatar} from "@pages/feedback/ui/FeedbackAvatar/FeedbackAvatar";
import React from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type HeaderCard = {
    rating: number,
    createdAt: string,
    imageSrc: string,
    fullName: string
}
export const HeaderCard: React.FC = ({rating, createdAt, imageSrc, fullName}: HeaderCard) => {
    const breakpoint = useBreakpoint();
    return <div className={styles.container}>
        {breakpoint.xs ? <FeedbackAvatar imageSrc={imageSrc} fullName={fullName}/> : ''}
        <div className={styles.wrapperHeader}>
            <Rate
                disabled
                defaultValue={rating}
                character={({value, index}) =>
                    value && index !== undefined && index < value ? (
                        <StarFilled style={{
                            color: 'var(--character-light-warning)'
                        }}/>
                    ) : (
                        <StarOutlined style={{
                            color: 'var(--character-light-warning)'
                        }}/>
                    )
                }
                style={{fontSize: '14px'}}
            />
            <p> {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    </div>
}
