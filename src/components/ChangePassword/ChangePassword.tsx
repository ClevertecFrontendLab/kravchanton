import {Button, Form, Input, Typography} from "antd";
import styles from './ChangePassword.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import React, {useState} from 'react';
import useForm from "antd/es/form/hooks/useForm";
import {changePassword, setData} from "@pages/auth/model/auth.slice";
import {regularForValidation} from "@utils/constants/constants";

const {Text} = Typography;
export const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const [disabledSave, setDisabledSave] = useState(true);
    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({errors}) => errors.length);
        form.getFieldValue().passwordConfirm.length > 7 && setDisabledSave(hasErrors);
    }
    const onFinish = (values: any) => {
        dispatch(setData(values))
        dispatch(changePassword())
    };
    return <div className={styles.wrapper}>
        <Text style={{fontSize: " 24px", fontWeight: "500"}}>Восстановление
            аккаунта</Text>
        <Form
            form={form}
            onFieldsChange={handleFormChange}

            initialValues={{
                password: '',
                passwordConfirm: ''
            }}
            onFinish={onFinish}
            className={styles.form}>
            <div>

                <Form.Item rules={[{
                    required: true,
                    message: "Пароль не менее 8 латинских букв с заглавной и цифрой",
                    whiteSpace: true
                }, {pattern: new RegExp(regularForValidation)}]}
                           help={<Text style={{fontSize: '12px'}} type="secondary">Пароль не менее 8
                               латинских букв с заглавной и цифрой</Text>}
                           name='password'>
                    <Input.Password size='large'
                                    data-test-id='change-password'
                                    placeholder='Пароль'
                                    help='Пароль не менее 8 латинских букв с заглавной и цифрой'

                    ></Input.Password>
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Пароли не совпадают',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Пароли не совпадают');
                        },
                    }),
                ]}
                           name='passwordConfirm'>
                    <Input.Password size='large' className={styles.passwordConfirm}
                                    data-test-id='change-confirm-password'
                                    placeholder='Повторите пароль'
                                    help="Пароли не совпадают"></Input.Password>
                </Form.Item>
            </div>
            <div>
                <Form.Item>
                    <Button htmlType='submit' disabled={
                        disabledSave} className={styles.button}
                            data-test-id='change-submit-button'
                            block type='primary'
                            size='large'>
                        Сохранить
                    </Button>
                </Form.Item>
            </div>
        </Form>
    </div>
};
