import {FC} from 'react';

import {Button, Result} from 'antd';
import {history} from "@redux/configure-store";
import {changePassword, checkEmail, registration} from "@pages/auth/model/auth.slice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {paths} from "@utils/constants/paths";

type ResultError = {
    status: string,
    title: string,
    subTitle: string,
    button: string
    testId: string
}
export const ResultAuth: FC = ({status, title, subTitle,  button, testId}: ResultError) => {
    const dispatch = useAppDispatch();

    const handleButton = () => {
        if(status == "success") {
            history.push(paths.auth)
        }
        else if (testId == 'registration-retry-button') {
            history.back();
            dispatch(registration())
        }
        else if (testId == 'change-retry-button') {
            history.back();
            dispatch(changePassword())
        }
        else if (testId == 'check-back-button') {
            history.back();
            dispatch(checkEmail())
        }
       else  history.back();
    }
    return (<Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={
                <Button data-test-id={testId} size='large' type='primary' block key={"error"}
                        onClick={handleButton}
                        htmlType='button'>
                    {button}
                </Button>
            }
        />
    );
}
