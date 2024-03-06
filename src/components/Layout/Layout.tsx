import styles from './Layout.module.scss'
import {Outlet} from 'react-router-dom'
import {Wrapper} from "@components/Wrapper/Wrapper";

export const Layout: React.FC = () => {
    return <div className={styles.wrapper}>
        <div className={styles.blur}>
            <Wrapper>
                <Outlet/>
            </Wrapper>
        </div>
    </div>

}
