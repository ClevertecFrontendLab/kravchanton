import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from './FeedbackAvatar.module.scss'

export const FeedbackAvatar = ({imageSrc, fullName}) => {
    return <div className={styles.wrapper}> <Avatar
        alt='author'
        src={imageSrc}
        icon={<UserOutlined/>}
        style={{backgroundColor: '#F5F5F5', color: '#262626'}}
        size='large'
    />
        <div className={styles.name}>
            {fullName ? (fullName?.split(' ').map((name, i) => (
                <p key={i}>{name}</p>
            ))) : (<p>Пользователь</p>)}
        </div>
    </div>
}
