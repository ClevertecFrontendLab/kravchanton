import styles from './AuthPage.module.scss'
import React from "react";
import logo from '../../../assets/image/Logo.png'
import {Navigate, NavLink, useLocation} from "react-router-dom";
import {Tabs} from "antd";
import {AuthForm} from "@pages/auth/ui/AuthForm/AuthForm";
import {RegistrationForm} from "@pages/auth/ui/RegistrationForm/RegistrationForm";
import {useSelector} from "react-redux";
import {history} from "@redux/configure-store";


export const AuthPage = () => {
    const location = useLocation()
    const activeKey=location.pathname.split('/')[location.pathname.split('/').length-1];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return !isLoggedIn ?
            <div className={styles.form}>
                <div className={styles.logo}><img src={logo}/></div>
                <Tabs
                    activeKey={activeKey}
                    destroyInactiveTabPane={true}
                    size={'large'}
                    items={[
                        {
                            label: <NavLink to={'/auth'}>Вход</NavLink>,
                            key: "auth",
                            children: <AuthForm />,
                        },
                        {
                            label: <NavLink to={'registration'}>Регистрация</NavLink>,
                            key: "registration",
                            children: <RegistrationForm />,
                        },
                    ]}
                />
    </div> : <Navigate to="/main" />
}
