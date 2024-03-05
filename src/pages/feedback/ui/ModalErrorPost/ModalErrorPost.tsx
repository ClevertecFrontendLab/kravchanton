import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setModalErrorPost} from "@pages/feedback/model/feedback.slice";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type ModalErrorPostType = {
    modalErrorPost: boolean,
    setAddReviewModal: (value: boolean) => void
}

export const ModalErrorPost: React.FC = ({
                                             modalErrorPost,
                                             setAddReviewModal
                                         }: ModalErrorPostType) => {
    const dispatch = useAppDispatch()
    const breakpoint = useBreakpoint();

    const handleClose = () => {
        dispatch(setModalErrorPost(false))
    }
    return <Modal footer={null}
                  width={breakpoint.xs ? "auto" : 520}
                  closable={false}
                  open={modalErrorPost}>
        <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте ещё раз."
            extra={[
                <Button data-test-id='write-review-not-saved-modal'
                        onClick={() => setAddReviewModal(true)} type="primary">
                    Написать отзыв
                </Button>,
                <Button onClick={handleClose}>Закрыть</Button>,
            ]}
        />
    </Modal>
}
