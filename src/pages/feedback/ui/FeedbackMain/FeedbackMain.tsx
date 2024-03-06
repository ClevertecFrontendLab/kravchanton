import {FeedbackCard} from "@pages/feedback/ui/FeedbackCard/FeedbackCard";
import styles from './FeedbackMain.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FeedbackType, fetchFeedback} from "@pages/feedback/model/feedback.slice";
import {RootState} from "@redux/configure-store";
import {Button} from "antd";
import {ModalAddReview} from "@pages/feedback/ui/ModalAddReview/ModalAddReview";
import {ModalError} from "@pages/feedback/ui/ModalError/ModalError";
import {ModalSuccess} from "@pages/feedback/ui/ModalCuccess/ModalSuccess";
import {ModalErrorPost} from "@pages/feedback/ui/ModalErrorPost/ModalErrorPost";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {feedbackSelector} from "@utils/Selectors/Selectors";

export const FeedbackMain: React.FC = () => {
    const [ShowFullReviews, setShowFullReviews] = useState(false)
    const [addReviewModal, setAddReviewModal] = useState(false)
    const dispatch = useAppDispatch()
    const {
        data,
        modalError,
        modalSuccess,
        modalErrorPost
    } = useSelector<RootState, FeedbackType>(feedbackSelector)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(0)
    const breakpoint = useBreakpoint();
    useEffect(() => {
        dispatch(fetchFeedback())
    }, [])
    const closeModalAddReview = () => {
        setAddReviewModal(false)
    }
    const sortedFeedbacks = data
        && [...data]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const feedbacks = ShowFullReviews ? (sortedFeedbacks) : (sortedFeedbacks?.slice(0, 4))
    return <> {feedbacks.length > 0 ? <div className={styles.contentWrap}>
        <div className={styles.cards}>
            {feedbacks.map(t => <FeedbackCard
                key={t.id} id={t.id} createdAt={t.createdAt} fullName={t.fullName}
                imageSrc={t.imageSrc}
                message={t.message}
                rating={t.rating}/>)}
        </div>
        <div className={styles.buttons}>
            <Button
                type='primary'
                size='large'
                onClick={() => setAddReviewModal(true)}
                data-test-id='write-review'
                style={{
                    background: " var(--primary-light-6)",
                    width: `${breakpoint.xs ? "100%" : "auto"}`
                }}>
                Написать отзыв
            </Button>
            <Button
                type='link'
                size='large'
                onClick={() => setShowFullReviews(prev => !prev)}
                data-test-id='all-reviews-button'
                style={{
                    color: "var(--primary-light-6)",
                    width: `${breakpoint.xs ? "100%" : "auto"}`
                }}
            >
                {ShowFullReviews ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
            </Button>
        </div>
    </div> : <div className={styles.contentWrap}>
        <div className={styles.emptyCard}>
            <p>Оставьте свой отзыв первым</p>
            <span>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.</span>
        </div>
        <div className={styles.btnWrapper}>
            <Button
                type='primary'
                size='large'
                onClick={() => setAddReviewModal(true)}
                data-test-id='write-review'
                style={{
                    background: " var(--primary-light-6)",
                    width: `${breakpoint.xs ? "100%" : "auto"}`
                }}>
                Написать отзыв
            </Button>
        </div>
    </div>}
        < ModalError modalError={modalError}/>
        <ModalAddReview message={message} setMessage={setMessage} rating={rating}
                        setRating={setRating} addReviewModal={addReviewModal}
                        closeModalAddReview={closeModalAddReview}/>
        <ModalSuccess modalSuccess={modalSuccess}/>
        <ModalErrorPost modalErrorPost={modalErrorPost} setAddReviewModal={setAddReviewModal}/>
    </>
}
