import {Button, Checkbox, Form, Input} from "antd";
import {GooglePlusOutlined} from "@ant-design/icons";
import styles from './AuthForm.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {checkEmail, login, setData} from '../../model/auth.slice';
import React, {FC, useState} from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {paths} from "@utils/constants/paths";
import {regular, regularForValidation} from "@utils/constants/constants";

export const AuthForm: FC = () => {
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    type AuthFormType = {
        email: string,
        password: string,
        remember: boolean
    }
    const [email, setEmail] = useState('')
    const onFinish = (values: AuthFormType): void => dispatch(login(values))
    const HandleCheckEmail = () => {
        const data = {
            email,
            password: ''
        }
        dispatch(setData(data))
        dispatch(checkEmail())
    }
    return (
        <Form
            initialValues={{
                email: '',
                password: '',
                remember: false,
            }}
            onFinish={onFinish}
            className={styles.form}>
            <div>
                <Form.Item rules={[{
                    required: true,
                    message: ""
                }, {
                    validator(_, value) {
                        if (String(value).toLowerCase().match(regular)) {
                            return Promise.resolve(setEmail(value));
                        } else {
                            return Promise.reject(setEmail(''));
                        }
                    },
                }]}
                           help=''
                           name='email'>
                    <Input addonBefore='e-mail:' size='large' data-test-id='login-email'
                    />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: ""
                }, {pattern: new RegExp(regularForValidation)}]}
                           name='password' help=''>
                    <Input.Password size='large' placeholder='Пароль'
                                    data-test-id='login-password'></Input.Password>
                </Form.Item>
            </div>
            <div className={styles.rowForm}>
                <Form.Item style={{marginBottom: 0}} name='remember' valuePropName="checked">
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <Button className={styles.text} onClick={() => email && HandleCheckEmail()}
                        data-test-id='login-forgot-button'
                        size='large' type='link'>
                    Забыли пароль?
                </Button>

            </div>
            <div>
                <Form.Item>
                    <Button htmlType='submit' className={styles.button}
                            data-test-id='login-submit-button'
                            block type='primary'
                            size='large'>
                        Войти
                    </Button>
                </Form.Item>
                {breakpoint.xs ?
                    (<Button
                        block
                        type='default'
                        size='large'
                    >
                        Войти через Google
                    </Button>)
                    :
                    (<Button
                        onClick={() => window.location.href = paths.googleAuth}
                        block
                        type='default'
                        size='large'
                        icon={<GooglePlusOutlined/>}
                    > Войти через Google
                    </Button>)}
            </div>
        </Form>
    );
};
