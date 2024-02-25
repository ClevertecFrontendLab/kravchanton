import {instance} from "@utils/api";
import {confirmEmail} from "@pages/auth/model/auth.slice";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post("auth/login", data);
    },
    registration(data: LoginParamsType) {
        return instance.post("auth/registration", data);
    },
    checkEmail(data: LoginParamsType) {

        return instance.post("auth/check-email", {
            "email": data
        });
    },
    confirmEmail(data: LoginParamsType) {
        return instance.post("auth/confirm-email", data);
    },
    changePassword(data: LoginParamsType) {
        return instance.post("auth/change-password", data);
    },
};

export type LoginParamsType = {
    email: string;
    password?: string;
    confirmPassword?: string
    code?: string
};
