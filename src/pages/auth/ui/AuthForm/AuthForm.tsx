import {Button, Checkbox, Form, Input} from "antd";
import {GooglePlusOutlined} from "@ant-design/icons";
import styles from './AuthForm.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {checkEmail, login} from '../../model/auth.slice';
import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    type AuthFormType = {
        email: string,
        password: string
    }
const[email, setEmail] = useState('')


    const onFinish = async (values: AuthFormType): void => {
        await dispatch(login(values))

    };
    const HandleCheckEmail = async () => {
        await dispatch(checkEmail(email))
    }
    return (


        <Form

            initialValues={{
                email: '',
                password: ''
            }}
            onFinish={onFinish}
            className={styles.form}>
            <div>
                <Form.Item rules={[{
                    required: true,
                    message: ""
                }, {
                    validator(_, value) {
                        if (String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                            return Promise.resolve(setEmail(value));
                        } else {
                            return Promise.reject(setEmail(''));
                        }
                    },
                }]}
                           help={''}
                           name={'email'}>

                    <Input addonBefore='e-mail:' size={'large'} data-test-id='login-email'
                    />
                </Form.Item>

                <Form.Item rules={[{
                    required: true,
                    message: ""
                }, {pattern: new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g)}]}
                           name={'password'} help={''}>
                    <Input.Password size={'large'} placeholder='Пароль'
                                    data-test-id='login-password'></Input.Password>
                </Form.Item>
            </div>

            <div className={styles.rowForm}>
                <Form.Item style={{marginBottom: 0}}>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <Button className={styles.text} disabled={!email} onClick={HandleCheckEmail}
                        data-test-id='login-forgot-button'
                        size={'large'} type={'link'}>
                    Забыли пароль?
                </Button>

            </div>
            <div>
                <Form.Item>
                    <Button htmlType='submit' className={styles.button}
                            data-test-id='login-submit-button'
                            block type={'primary'}
                            size={'large'}>
                        Войти
                    </Button>
                </Form.Item>
                <Button
                    block
                    type={'default'}
                    size={'large'}
                    icon={<GooglePlusOutlined/>}
                >
                    Войти через Google
                </Button>
            </div>
        </Form>

    );
};
