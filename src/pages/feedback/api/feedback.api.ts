import {instance} from "@utils/api";


export const feedbackAPI = {
    fetchFeedback() {
        return instance.get("feedback");
    },
    postFeedback(data:FeedbackParamsType ) {
        return instance.post("feedback", data);
    },
};

export type FeedbackParamsType ={
    "message": "string",
    "rating": number
}
