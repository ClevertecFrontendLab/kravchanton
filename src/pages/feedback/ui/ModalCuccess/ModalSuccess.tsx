import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setModalSuccess} from "@pages/feedback/model/feedback.slice";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type ModalSuccessType = {
    setModalSuccess: (value: boolean) => void
}
export const ModalSuccess: React.FC = ({modalSuccess}: ModalSuccessType) => {
    const dispatch = useAppDispatch()
    const breakpoint = useBreakpoint();
    const handleClose = () => {
        dispatch(setModalSuccess(false))
    }
    return <Modal footer={null}
                  closable={false}
                  width={breakpoint.xs ? "auto" : 520}
                  open={modalSuccess}>
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
