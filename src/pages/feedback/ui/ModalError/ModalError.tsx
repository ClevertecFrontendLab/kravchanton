import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setErrorGetFeedback} from "@pages/feedback/model/feedback.slice";
import {history} from "@redux/configure-store";


export const ModalError = ({modalError}: boolean) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setErrorGetFeedback(false))
        history.push('/main')
    }
    return <Modal footer={null} closable={false} open={modalError}>
        <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            extra={<Button onClick={handleClose} type="primary">Назад</Button>}
        />
    </Modal>
}
