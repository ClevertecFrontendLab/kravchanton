import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import styles from './HeaderCard.module.scss'

export const HeaderCard = ({rating, createdAt}) => {
    return <div className={styles.wrapperHeader}> <Rate
        disabled
        defaultValue={rating}
        character={({value, index}) =>
            value && index !== undefined && index < value ? (
                <StarFilled/>
            ) : (
                <StarOutlined/>
            )
        }
        style={{fontSize: '14px'}}
    />
        <p> {new Date(createdAt).toLocaleDateString()}</p>
    </div>
}
