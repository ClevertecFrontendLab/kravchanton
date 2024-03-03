import {instance} from "@utils/api";


export const feedbackAPI = {
    fetchFeedback() {
        return instance.get("feedback");
    },
};

export type LoginParamsType = {
    email: string;
    password?: string;
    confirmPassword?: string
    code?: string
};
