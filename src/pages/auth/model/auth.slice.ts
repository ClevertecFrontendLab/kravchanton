import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@utils/create-app-async-thunk";
import {authAPI, LoginParamsType} from "@pages/auth/api/auth.api";
import {history} from './../../../redux/configure-store';


export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const response = await authAPI.login(arg)
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
export const checkEmail = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/registration", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const response = await authAPI.checkEmail(arg)
        history.push('confirm-email', {state: history.location.pathname});
        dispatch(setIsLoading(false))
        return response.data
    } catch (error) {
console.log(error.response)
        if (error.response.data.statusCode == 404 && error.response.data.message == 'Email не найден') {
            history.push("/result/error-check-email-no-exist", {state: history.location.pathname});
            dispatch(setIsLoading(false))
        } else {
            history.push("/result/error-check-email", {state: history.location.pathname});
            dispatch(setIsLoading(false))

        }

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
    isLoggedIn: boolean
}
const initialState: AuthType = {
    accessToken: null,
    email: '',
    password: '',
    isLoggedIn: false,
    isLoading: false
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state: AuthType, action) {
            state.isLoggedIn = action.payload
        },
        setData(state:AuthType, action  ) {
            state.email = action.payload.email
            state.password = action.payload.password
        },
        setIsLogout(state: AuthType) {
            localStorage.clear()
            state.isLoggedIn = false
        },
        setIsLoading(state: AuthType, action) {
            state.isLoading = action.payload
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
                localStorage.token = action.payload.accessToken;
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
export const {setIsLoggedIn, setIsLogout, setData} = AuthSlice.actions;

export const authSlice = AuthSlice.reducer;
