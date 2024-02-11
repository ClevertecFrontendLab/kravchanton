import React from 'react';
import styles from './HeaderContent.module.scss'
import {Button} from 'antd';
import {SettingOutlined} from "@ant-design/icons";

export const HeaderContent = () => {
    return <div className={styles.header}>
        <p> Главная</p>
        <div className={styles.wrapper}>
            <h1> Приветствуем тебя в CleverFit — приложении, <br/> которое
                поможет тебе добиться своей мечты!</h1>
            <Button className={styles.settings} shape='circle' icon={<SettingOutlined/>}>
                Настройки
            </Button>

        </div>
    </div>
}
