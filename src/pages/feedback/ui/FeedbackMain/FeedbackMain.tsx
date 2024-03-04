import {FeedbackCard} from "@pages/feedback/ui/FeedbackCard/FeedbackCard";
import styles from './FeedbackMain.module.scss'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FeedbackType, fetchFeedback} from "@pages/feedback/model/feedback.slice";
import {RootState} from "@redux/configure-store";
import {Button} from "antd";
import {ModalError} from "@pages/feedback/ui/ModalError";
import {ModalAddReview} from "@pages/feedback/ui/ModalAddReview/ModalAddReview";

export const FeedbackMain = () => {
    const [ShowFullReviews, setShowFullReviews] = useState(false)
    const [addReviewModal, setAddReviewModal] = useState(false)
    const dispatch = useAppDispatch()
    const {data, modalError} = useSelector<RootState, FeedbackType>(state => state.feedback)

    useEffect(() => {
        dispatch(fetchFeedback())
    }, [])
    const closeModalAddReview = () => {
        setAddReviewModal(false)
    }
    const sortedFeedbacks = data
        && [...data]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const feedbacks = ShowFullReviews ? sortedFeedbacks : sortedFeedbacks?.slice(0, 4)

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
                style={{background: " var(--primary-light-6)"}}

            >
                Написать отзыв
            </Button>
            <Button
                type={'link'}
                size={'large'}
                onClick={() => setShowFullReviews(prev => !prev)}
                data-test-id='all-reviews-button'
                style={{color: "var(--primary-light-6)"}}
            >
                {ShowFullReviews ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
            </Button></div>
    </div> : <div className={styles.contentWrap}>
        <div className={styles.emptyCard}>

            <p>Оставьте свой отзыв первым</p>
            <span>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.</span>
        </div>
        <div className={styles.btnWrapper}><Button
            type='primary'
            size='large'
            onClick={() => setAddReviewModal(true)}
            data-test-id='write-review'
            style={{background: " var(--primary-light-6)"}}

        >
            Написать отзыв
        </Button></div>
    </div>}
        < ModalError modalError={modalError}
        />
        <ModalAddReview addReviewModal={addReviewModal} closeModalAddReview={closeModalAddReview}/>
    </>
}
