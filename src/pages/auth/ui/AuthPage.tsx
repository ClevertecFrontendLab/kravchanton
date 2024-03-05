import styles from './AuthPage.module.scss'
import React from "react";
import logo from '../../../assets/image/Logo.png'
import {NavLink, useLocation} from "react-router-dom";
import {Tabs} from "antd";
import {AuthForm} from "@pages/auth/ui/AuthForm/AuthForm";
import {RegistrationForm} from "@pages/auth/ui/RegistrationForm/RegistrationForm";
import {paths} from "@utils/constants/paths";


export const AuthPage = () => {
    const location = useLocation()
    const activeKey = location.pathname.split('/')[location.pathname.split('/').length - 1];

    return <div className={styles.form}>
        <div className={styles.logo}><img src={logo}/></div>
        <Tabs
            activeKey={activeKey}
            destroyInactiveTabPane={true}
            size={'large'}
            items={[
                {
                    label: <NavLink to={paths.auth}>Вход</NavLink>,
                    key: "auth",
                    children: <AuthForm/>,
                },
                {
                    label: <NavLink to={paths.registration}>Регистрация</NavLink>,
                    key: "registration",
                    children: <RegistrationForm/>,
                },
            ]}
        />
    </div>
}
