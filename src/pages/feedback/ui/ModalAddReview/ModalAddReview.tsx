import {Button, Modal, Rate} from "antd";
import styles from './ModalAddReview.module.scss'
import {StarFilled, StarOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {postFeedback} from "@pages/feedback/model/feedback.slice";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const ModalAddReview = ({
                                   addReviewModal,
                                   closeModalAddReview,
                                   message,
                                   setMessage,
                                   rating,
                                   setRating
                               }) => {
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
                    </Button>} onCancel={closeModalAddReview}>
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
            <TextArea value={message} rows={2} placeholder="Autosize height based on content lines"
                      onChange={onChange}/>
        </div>

    </Modal></>
}
