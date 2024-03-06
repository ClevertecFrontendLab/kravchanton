import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@utils/create-app-async-thunk";
import {authAPI, LoginParamsType} from "@pages/auth/api/auth.api";
import {history} from './../../../redux/configure-store';
import {paths} from "@utils/constants/paths";


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async ({
                                                                                                            email,
                                                                                                            password,
                                                                                                            remember
                                                                                                        }, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        const response = await authAPI.login({email, password})
        if (remember) {
            localStorage.token = response.data.accessToken;
        }
        dispatch(setIsLoggedIn(true))
        sessionStorage.token = response.data.accessToken;
        dispatch(setAccessToken(response.data.accessToken))
        history.push(paths.main)
        return response.data
    } catch (error) {
        history.push((paths.result + "/" + paths.errorLogin), {state: history.location.pathname});
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading(false))
    }
})

export const registration = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/registration", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        const values = {
            email: thunkAPI.getState().auth.email,
            password: thunkAPI.getState().auth.password
        }
        const response = await authAPI.registration(values)
        history.push((paths.result + "/" + paths.success), {state: history.location.pathname});
        return response.data
    } catch (error) {
        if (error.response.status === 409) {
            history.push((paths.result + "/" + paths.errorUserExist), {state: history.location.pathname});
        } else {
            history.push((paths.result + "/" + paths.error), {state: history.location.pathname});
        }
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading(false))
    }
})
export const checkEmail = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/checkEmail", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        const email = thunkAPI.getState().auth.email;
        const response = await authAPI.checkEmail(email)
        history.push((paths.auth + "/" + paths.confirmEmail), {state: history.location.pathname});
        return response.data
    } catch (error) {
        console.log(error.response)
        if (error.response.status == 404 && error.response.data.message == 'Email не найден') {
            history.push((paths.result + "/" + paths.errorCheckEmailNoExist), {state: history.location.pathname});
        } else {
            history.push((paths.result + "/" + paths.errorCheckEmail), {state: history.location.pathname});
        }
        return rejectWithValue(error)

    } finally {
        dispatch(setIsLoading(false))
    }
})
export const confirmEmail = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/confirmEmail", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        const response = await authAPI.confirmEmail(arg)
        history.push((paths.auth + "/" + paths.changePassword), {state: history.location.pathname});
        dispatch(setIsLoading(false))
        return response.data
    } catch (error) {
        dispatch(setError(true))
        return rejectWithValue(error)

    } finally {
        dispatch(setIsLoading(false))
    }
})
export const changePassword = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/changePassword", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const values = {
        password: thunkAPI.getState().auth.password,
        confirmPassword: thunkAPI.getState().auth.password
    }
    dispatch(setIsLoading(true))
    try {
        const response = await authAPI.changePassword(values)
        history.push((paths.result + "/" + paths.successChangePassword), {state: history.location.pathname});
        return response.data
    } catch (error) {
        console.log(error)
        error && history.push((paths.result + "/" + paths.errorChangePassword), {state: history.location.pathname});
        return rejectWithValue(error)

    } finally {
        dispatch(setIsLoading(false))
    }
})
type PayloadType = {
    "accessToken": "string"
}
type AuthType = {
    accessToken: "string" | null
    email: '',
    password: '',
    isLoading: boolean
    isLoggedIn: boolean,
    error: boolean
}
const initialState: AuthType = {
    accessToken: null,
    email: '',
    password: '',
    isLoggedIn: false,
    isLoading: false,
    error: false
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state: AuthType, action) {
            state.isLoggedIn = action.payload
        },
        setData(state: AuthType, action) {
            state.email = action.payload.email
            state.password = action.payload.password
        },
        setIsLogout(state: AuthType) {
            localStorage.clear()
            sessionStorage.clear()
            state.isLoggedIn = false
            state.accessToken = ''
        },
        setIsLoading(state: AuthType, action) {
            state.isLoading = action.payload
        },
        setError(state: AuthType, action) {
            state.error = action.payload
        },
        setAccessToken(state: AuthType, action) {
            state.accessToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state: AuthType, action: { payload: PayloadType }) => {
                state.accessToken = action.payload.accessToken
            })
    },
});
export const {
    setIsLoggedIn,
    setIsLogout,
    setData,
    setError,
    setIsLoading,
    setAccessToken
} = AuthSlice.actions;

export const authSlice = AuthSlice.reducer;
