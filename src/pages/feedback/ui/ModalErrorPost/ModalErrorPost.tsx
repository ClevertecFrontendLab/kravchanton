import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setModalErrorPost} from "@pages/feedback/model/feedback.slice";


export const ModalErrorPost = ({modalErrorPost, setAddReviewModal}) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setModalErrorPost(false))
    }
    return <Modal footer={null} closable={false} open={modalErrorPost}>
        <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте ещё раз."
            extra={[
                <Button data-test-id='write-review-not-saved-modal' onClick={() => setAddReviewModal(true)} type="primary">
                    Написать отзыв
                </Button>,
                <Button onClick={handleClose}>Закрыть</Button>,
            ]}
        />
    </Modal>
}
