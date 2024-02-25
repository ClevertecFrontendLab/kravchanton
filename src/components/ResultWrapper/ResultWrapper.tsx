import {FC} from "react";
import styles from './ResultWrapper.module.scss'


export const ResultWrapper: FC = ({children}) => <div className={styles.wrapper}>{children}</div>
