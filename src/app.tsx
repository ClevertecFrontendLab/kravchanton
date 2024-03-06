import {AuthPage} from "@pages/auth/ui/AuthPage";
import React, {useEffect} from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Loader} from "@components/Loader/Loader";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setAccessToken, setIsLoggedIn} from "@pages/auth/model/auth.slice";
import {MainPage} from "@pages/main-page";
import {ResultAuth} from "@components/Results/ResultAuth";
import {CheckEmail} from "@components/CheckEmail/CheckEmail";
import {LayoutResult} from "@components/LayoutResult/LayoutResult";
import {Layout} from "@components/Layout/Layout";
import {ChangePassword} from "@components/ChangePassword/ChangePassword";
import {Spin} from "antd";
import {MainPageContent} from "@pages/main-page/MainPageContent";
import {FeedbackPage} from "@pages/feedback/ui/feedback-page";
import {history} from "@redux/configure-store";
import {accessTokenSelector, isLoadingSelector} from "@utils/Selectors/Selectors";
import {paths} from "@utils/constants/paths";


export const App = () => {
    const isLoading = useSelector(isLoadingSelector)
    const dispatch = useAppDispatch()
    const accessToken = useSelector(accessTokenSelector);
    const accessTokenFromGoogle = new URLSearchParams(window.location.search).get('accessToken');
    if (accessTokenFromGoogle) {
        localStorage.token = accessTokenFromGoogle;
        dispatch(setIsLoggedIn(true))
        sessionStorage.token = accessTokenFromGoogle;
        dispatch(setAccessToken(accessTokenFromGoogle))
    }
    const results = [
        {
            id: 1,
            path: paths.errorLogin,
            status: 'warning',
            title: 'Вход не выполнен',
            subTitle: 'Что-то пошло не так. Попробуйте еще раз',
            button: 'Повторить',
            testId: 'login-retry-button'
        },
        {
            id: 2,
            path: paths.errorUserExist,
            status: "error",
            title: "Данные не сохранились",
            subTitle: "Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.",
            button: 'Назад к регистрации',
            testId: 'registration-back-button'
        },
        {
            id: 3,
            path: paths.error,
            status: "error",
            title: "Данные не сохранились",
            subTitle: "Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.",
            button: 'Повторить',
            testId: 'registration-retry-button'
        },
        {
            id: 4,
            path: paths.success,
            status: "success",
            title: "Регистрация успешна",
            subTitle: "Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль",
            button: 'Вход',
            testId: 'registration-enter-button'
        },
        {
            id: 5,
            path: paths.errorCheckEmailNoExist,
            status: "error",
            title: "Такой e-mail не зарегистрирован",
            subTitle: "Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.",
            button: 'Попробовать снова',
            testId: 'check-retry-button'
        },
        {
            id: 6,
            path: paths.errorCheckEmail,
            status: "500",
            title: "Что-то пошло не так",
            subTitle: "Произошла ошибка, попробуйте отправить форму ещё раз.",
            button: 'Назад',
            testId: 'check-back-button'
        }, {
            id: 7,
            path: paths.errorChangePassword,
            status: "error",
            title: "Данные не сохранились",
            subTitle: "Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.",
            button: 'Повторить',
            testId: 'change-retry-button'
        },
        {
            id: 8,
            path: paths.successChangePassword,
            status: "success",
            title: "Пароль успешно изменен",
            subTitle: "Теперь можно войти в аккаунт, используя свой логин и новый пароль",
            button: 'Войти',
            testId: 'change-entry-button'
        },

    ]

    useEffect(() => {
        dispatch(setIsLoggedIn(!!localStorage.token))
        localStorage.token && dispatch(setAccessToken(localStorage.token))
        if (!localStorage.token && !accessToken) history.push(paths.auth)
        else if (setIsLoggedIn || localStorage.token) {
            history.location.pathname !== paths.auth ? history.push(history.location.pathname) : history.push(paths.main)
        }

    }, []);
    return <>
        <Spin spinning={isLoading} indicator={<Loader/>}/>

        <Routes>
            <Route path={'/'} element={<Navigate to={paths.auth}/>}/>
            <Route path={paths.auth} element={<Layout/>}>
                <Route index element={<AuthPage/>}/>
                <Route path={paths.registration} element={<AuthPage/>}/>
                <Route path={paths.confirmEmail} element={<CheckEmail/>}/>
                <Route path={paths.changePassword} element={<ChangePassword/>}/>
            </Route>
            <Route path={'/'} element={<MainPage/>}>
                <Route path={paths.main} element={<MainPageContent/>}/>
                <Route path={paths.feedbacks} element={<FeedbackPage/>}/>

            </Route>

            <Route path={paths.result} element={<LayoutResult/>}>
                {results.map((t) => <Route path={t.path} key={t.id}
                                           element={<ResultAuth status={t.status} title={t.title}
                                                                subTitle={t.subTitle}
                                                                button={t.button}
                                                                testId={t.testId}/>}/>)}
            </Route>
        </Routes>

    </>
}
