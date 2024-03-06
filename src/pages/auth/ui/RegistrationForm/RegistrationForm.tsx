import {Button, Form, Input, Typography} from "antd";
import {GooglePlusOutlined} from "@ant-design/icons";
import styles from './RegistrationForm.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {registration, setData} from '../../model/auth.slice';
import React, {useState} from 'react';
import useForm from "antd/es/form/hooks/useForm";
import {regularForValidation} from "@utils/constants/constants";

const {Text} = Typography;

type RegistrationFormType = {
    email: string,
    password: string,
    passwordConfirm: string
}
export const RegistrationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const [disabledSave, setDisabledSave] = useState(true);
    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({errors}) => errors.length);
        form.getFieldValue().passwordConfirm.length > 7 && setDisabledSave(hasErrors);
    }
    const onFinish = (values: RegistrationFormType) => {
        dispatch(setData(values))
        dispatch(registration())
    };
    return <Form
        form={form}
        onFieldsChange={handleFormChange}
        initialValues={{
            email: '',
            password: '',
            passwordConfirm: ''
        }}
        onFinish={onFinish}
        className={styles.form}>
        <div>
            <Form.Item rules={[{required: true, message: ""}, {type: 'email', message: ""}]}
                       name='email'>
                <Input addonBefore='e-mail:' data-test-id='registration-email' size='large'/>
            </Form.Item>
            <Form.Item rules={[{
                required: true,
                message: "Пароль не менее 8 латинских букв с заглавной и цифрой",
                whiteSpace: true
            }, {pattern: new RegExp(regularForValidation)}]}
                       help={<Text style={{fontSize: '12px'}} type="secondary">Пароль не менее 8
                           латинских букв с заглавной и цифрой</Text>}
                       name='password'>
                <Input.Password size='large'
                                data-test-id='registration-password'
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
                                data-test-id='registration-confirm-password'
                                placeholder='Повторите пароль'
                                help="Пароли не совпадают"></Input.Password>
            </Form.Item>
        </div>
        <div>
            <Form.Item>
                <Button htmlType='submit' disabled={
                    disabledSave} className={styles.button}
                        data-test-id='registration-submit-button'
                        block type='primary'
                        size='large'>
                    Войти
                </Button>
            </Form.Item>
            <Button
                block
                type='default'
                size='large'
                icon={<GooglePlusOutlined/>}
            >
                Войти через Google
            </Button>
        </div>
    </Form>

};
