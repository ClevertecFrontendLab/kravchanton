import styles from './LayoutResult.module.scss'
import {Outlet, useNavigate} from 'react-router-dom'
import {ResultWrapper} from "@components/ResultWrapper/ResultWrapper";
import {history} from '@redux/configure-store';
import {useEffect} from "react";

export const LayoutResult: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        !history.location.state?.state && navigate('/')
    }, []);
    return <>
        <div className={styles.wrapper}>
            <div className={styles.blur}>
                <ResultWrapper>
                    <Outlet/>
                </ResultWrapper>
            </div>

        </div>
    </>
}
