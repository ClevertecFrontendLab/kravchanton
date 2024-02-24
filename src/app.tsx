import {AuthPage} from "@pages/auth/ui/AuthPage";
import React, {useEffect} from "react";
import {history} from "@redux/configure-store";
import {HistoryRouter} from "redux-first-history/rr6";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Loader} from "@components/Loader/Loader";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setIsLoggedIn} from "@pages/auth/model/auth.slice";
import {MainPage} from "@pages/main-page";
import {ResultAuth} from "@components/Results/ResultAuth";
import {Layout} from "@components/Layout/Layout";
import {ErrorCheckMail} from "@components/ErrorCheckMail/ErrorCheckMail";


export const App = () => {
    const isLoading = useSelector(state => state.auth.isLoading)
    const dispatch = useAppDispatch()


    useEffect(() => {
        console.log(localStorage.token)
        dispatch(setIsLoggedIn(!!localStorage.token))
        ;
    }, []);
    return <>{isLoading && <Loader/>}

        <Routes>
            <Route path={'/'} element={<Navigate to={"/auth"}/>}/>
            <Route path='/auth' element={<AuthPage/>}>
                <Route path='registration' element={<AuthPage/>}/>
            </Route>
            <Route path='/main' element={<MainPage/>}>
            </Route>

            <Route path='/result' element={<Layout/>}>
                <Route path='error-login'
                       element={<ResultAuth status={'warning'} title={'Вход не выполнен'}
                                            subTitle={'Что-то пошло не так. Попробуйте еще раз'}
                                            button={'Повторить'} testId={'login-retry-button'}/>}/>
                <Route path='error-user-exist'
                       element={<ResultAuth status={"error"} title={"Данные не сохранились"}
                                            subTitle={"Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."}
                                            button={'Назад к регистрации'}
                                            testId={'registration-back-button'}/>}/>
                <Route path='error'
                       element={<ResultAuth status={"error"} title={"Данные не сохранились"}
                                            subTitle={"Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз."}
                                            button={'Повторить'}
                                            testId={'registration-retry-button'}/>}/>
                <Route path='success'
                       element={<ResultAuth status={"success"} title={"Регистрация успешна"}
                                            subTitle={"Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль"}
                                            button={'Вход'}
                                            testId={'registration-enter-button'}/>}/>
                <Route path='error-check-email-no-exist'
                       element={<ResultAuth status={"error"} title={"Такой e-mail не зарегистрирован"}
                                            subTitle={"Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail."}
                                            button={'Попробовать снова'}
                                            testId={'check-retry-button'}/>}/>
                <Route path='error-check-email'
                       element={<ResultAuth status={"500"} title={"Что-то пошло не так"}
                                            subTitle={"Произошла ошибка, попробуйте отправить форму ещё раз."}
                                            button={'Назад'}
                                            testId={'check-back-button'}/>}/>
            </Route>
        </Routes>

    </>
}
