import React from 'react';
import styles from './HeaderContent.module.scss'
import {Button} from 'antd';
import {SettingOutlined} from "@ant-design/icons";

export const HeaderContent = () => <div>
    <p> Главная</p>
    <div className={styles.wrapper}>
        <h1> Приветствуем тебя в CleverFit — приложении, <br/> которое
            поможет тебе добиться своей мечты!</h1>
        <Button shape='none'
                type={'text'}
                icon={<SettingOutlined/>}>
            Настройки
        </Button>

    </div>
</div>

