import {Button, Modal, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setErrorGetFeedback} from "@pages/feedback/model/feedback.slice";
import {history} from "@redux/configure-store";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {paths} from "@utils/constants/paths";

export const ModalError: React.FC = ({modalError}: boolean) => {
    const dispatch = useAppDispatch()
    const breakpoint = useBreakpoint();
    const handleClose = () => {
        dispatch(setErrorGetFeedback(false))
        history.push(paths.main)
    }
    return <Modal footer={null}
                  closable={false}
                  width={breakpoint.xs ? "auto" : 520}
                  open={modalError}>
        <Result
            status="500"
            iconFontSize={100}
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            extra={<Button onClick={handleClose} type="primary">Назад</Button>}
        />
    </Modal>
}
