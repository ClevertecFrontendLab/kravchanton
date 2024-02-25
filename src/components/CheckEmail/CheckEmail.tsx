import {FC, useEffect, useState} from "react";
import {Result, Typography} from "antd";
import VerificationInput from "react-verification-input";
import styles from './CheckEmail.module.scss'
import {useSelector} from "react-redux";
import {confirmEmail} from "@pages/auth/model/auth.slice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";

const {Text} = Typography;

export const CheckEmail: FC = () => {
    const dispatch = useAppDispatch();

    const email = useSelector(state => state.auth.email)
    const error = useSelector(state => state.auth.error)
    const [verificationCode, setVerificationCode] = useState('');
    const handleConfirm = (code) => {

        dispatch(confirmEmail({email, code}))
        setVerificationCode('')
    }

    return <div className={styles.wrapper}>{error ? <Result
        status={'error'}
        title={"Неверный код. Введите код для восстановления аккауанта"}
        subTitle={<Text type="secondary">Мы отправили вам на e-mail <span
            style={{fontWeight: '600'}}>{email}</span> шестизначный код. Введите его в поле
            ниже.</Text>
        }
    /> : <Result
        title={"Введите код для восстановления аккаунта"}
        subTitle={<Text type="secondary">Мы отправили вам на e-mail <span
            style={{fontWeight: '600'}}>{email}</span> шестизначный код. Введите его в поле
            ниже.</Text>
        }
    />}
        <VerificationInput
            placeholder={' '}
            value={verificationCode}
            onChange={setVerificationCode}
            onComplete={(e) => handleConfirm(e)}
            inputProps={{'data-test-id': 'verification-input'}}
            classNames={{
                container: styles.container,
                character: error ? styles.characterRed : styles.character,
                characterInactive: error ? styles.inactiveRed : styles.inactive,
                characterSelected: "character--selected",
                characterFilled: "character--filled",
            }}/>
        <Text type="secondary">Не пришло письмо? Проверьте папку Спам.</Text>

    </div>
}
