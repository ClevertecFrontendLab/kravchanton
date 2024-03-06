import {instance} from "@utils/api";

export type FeedbackParamsType = {
    message: string,
    rating: number
}
export const feedbackAPI = {
    fetchFeedback() {
        return instance.get("feedback");
    },
    postFeedback(data: FeedbackParamsType) {
        return instance.post("feedback", data);
    },
};


