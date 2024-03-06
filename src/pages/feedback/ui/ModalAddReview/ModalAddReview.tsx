import {Button, Modal, Rate} from "antd";
import styles from './ModalAddReview.module.scss'
import {StarFilled, StarOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {postFeedback} from "@pages/feedback/model/feedback.slice";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type ModalAddReviewType = {
    message: string,
    setMessage: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    rating: number,
    setRating: (value: number) => void
    addReviewModal: boolean
    closeModalAddReview: () => void
}

export const ModalAddReview: React.FC = ({
                                             addReviewModal,
                                             closeModalAddReview,
                                             message,
                                             setMessage,
                                             rating,
                                             setRating
                                         }: ModalAddReviewType) => {
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };
    const postReview = () => {
        dispatch(postFeedback({message, rating}))
        closeModalAddReview()
    }
    return <><Modal title={<p className={styles.title}> Ваш отзыв</p>}
                    open={addReviewModal}
                    width={breakpoint.xs ? "auto" : 520}
                    onCancel={closeModalAddReview}
                    footer={<Button
                        type='primary'
                        size='large'
                        onClick={postReview}
                        data-test-id='new-review-submit-button'
                        style={{
                            background: " var(--primary-light-6)",
                            width: `${breakpoint.xs ? "100%" : "auto"}`
                        }}
                    >
                        Опубликовать
                    </Button>}
    >
        <div className={styles.wrapper}>
            <Rate
                onChange={setRating}
                value={rating}
                character={({value, index}) =>
                    value && index !== undefined && index < value ? (
                        <StarFilled style={{
                            color: 'var(--character-light-warning)'
                        }}/>
                    ) : (
                        <StarOutlined style={{
                            color: 'var(--character-light-warning)'
                        }}/>
                    )
                }
                style={{fontSize: '20px'}}
            />
            <TextArea value={message}
                      rows={2}
                      placeholder="Autosize height based on content lines"
                      onChange={onChange}/>
        </div>

    </Modal></>
}
