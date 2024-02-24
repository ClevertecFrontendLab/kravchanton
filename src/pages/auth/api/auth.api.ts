import {instance} from "@utils/api";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post("auth/login", data);
    },
    registration(data: LoginParamsType) {
        return instance.post("auth/registration", data);
    },
    checkEmail(data: LoginParamsType) {

        console.log(data)
        return instance.post("auth/check-email", {
            "email": data
        });
    },
};

export type LoginParamsType = {
    email: string;
    password?: string;
};
