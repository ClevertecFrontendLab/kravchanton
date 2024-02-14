import React from 'react';
import styles from './HeaderContent.module.scss'
import {Button} from 'antd';
import {SettingOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const HeaderContent = () => {
    const breakpoint = useBreakpoint();
    return <div>
        <p> Главная</p>
        <div className={styles.wrapper}>
            <h1> Приветствуем тебя в CleverFit — приложении, <br/> которое
                поможет тебе добиться своей мечты!</h1>

            {breakpoint.xs ?
                <Button shape='circle' icon={<SettingOutlined/>}></Button>
                :
                <Button shape='none'
                        type={'text'}
                        icon={<SettingOutlined/>}>
                    Настройки
                </Button>}

        </div>
    </div>

}
