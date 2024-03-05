import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setModalSuccess} from "@pages/feedback/model/feedback.slice";


export const ModalSuccess = ({modalSuccess}) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setModalSuccess(false))
    }
    return <Modal footer={null} closable={false} open={modalSuccess}>
        <Result
            status="success"
            title="Отзыв успешно опубликован"
            extra={<Button onClick={handleClose} style={{
                background: " var(--primary-light-6)",
                width: "100%"
            }} size={'large'} type="primary">Отлично</Button>}
        />
    </Modal>
}
