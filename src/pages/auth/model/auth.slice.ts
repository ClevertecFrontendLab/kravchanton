import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@utils/create-app-async-thunk";
import {authAPI, LoginParamsType} from "@pages/auth/api/auth.api";
import {history} from './../../../redux/configure-store';


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async ({email, password, remember}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const response = await authAPI.login({email, password})
        if(remember) {
            localStorage.token = response.data.accessToken;
        }
        console.log(remember)
        return response.data
    } catch {
        history.push('/result/error-login', {state: history.location.pathname});
        dispatch(setIsLoading(false))
    }
})

export const registration = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/registration", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const values = {
            email: thunkAPI.getState().auth.email,
            password: thunkAPI.getState().auth.password
        }
        const response = await authAPI.registration(values)
        history.push('/result/success', {state: history.location.pathname});
        return response.data

    } catch (error) {
        if (error.response.status === 409) {
            history.push('/result/error-user-exist', {state: history.location.pathname});
            dispatch(setIsLoading(false))
        } else {
            history.push('/result/error', {state: history.location.pathname});
            dispatch(setIsLoading(false))

        }

    }
})
export const checkEmail = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/checkEmail", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const email = thunkAPI.getState().auth.email;
        const response = await authAPI.checkEmail(email)
        history.push('/auth/confirm-email', {state: history.location.pathname});
        dispatch(setIsLoading(false))
        return response.data
    } catch (error) {
        console.log(error.response)
        if (error.response.status == 404 && error.response.data.message == 'Email не найден') {
            history.push("/result/error-check-email-no-exist", {state: history.location.pathname});
            dispatch(setIsLoading(false))
        } else {
            history.push("/result/error-check-email", {state: history.location.pathname});
            dispatch(setIsLoading(false))
        }
    }
})
export const confirmEmail = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/confirmEmail", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const response = await authAPI.confirmEmail(arg)
        history.push('/auth/change-password', {state: history.location.pathname});
        dispatch(setIsLoading(false))
        return response.data
    } catch (error) {
        dispatch(setError(true))
    }
})
export const changePassword = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/changePassword", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const values = {
        password: thunkAPI.getState().auth.password,
        confirmPassword: thunkAPI.getState().auth.password
    }
    try {
        const response = await authAPI.changePassword(values)
        history.push('/result/success-change-password', {state: history.location.pathname});
        return response.data
    } catch (error) {
        console.log(error)
        error && history.push('/result/error-change-password', {state: history.location.pathname});
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
            state.isLoggedIn = false
        },
        setIsLoading(state: AuthType, action) {
            state.isLoading = action.payload
        },
        setError(state: AuthType, action) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: AuthType) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state: AuthType, action: { payload: PayloadType }) => {
                state.isLoggedIn = true;
                state.accessToken = action.payload.accessToken
                state.isLoading = false;
            }).addCase(login.rejected, (state: AuthType, action) => {
            state.isLoading = false;
        })
            .addCase(registration.pending, (state: AuthType) => {
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state: AuthType, action) => {
                state.isLoggedIn = false;
                state.isLoading = false;
            }).addCase(registration.rejected, (state: AuthType, action) => {
            state.isLoading = false;
        })


    },
});
export const {setIsLoggedIn, setIsLogout, setData, setError} = AuthSlice.actions;

export const authSlice = AuthSlice.reducer;
