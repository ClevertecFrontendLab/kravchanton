import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@utils/create-app-async-thunk";
import {authAPI, LoginParamsType} from "@pages/auth/api/auth.api";
import {history} from './../../../redux/configure-store';
import {feedbackAPI} from "@pages/feedback/api/feedback.api";
import {setIsLoading} from "@pages/auth/model/auth.slice";


export const fetchFeedback = createAppAsyncThunk<any>("feedback/fetchFeedback", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        const response = await feedbackAPI.fetchFeedback()
        dispatch(setFeedback(response.data))
    } catch (error) {
        dispatch(setErrorGetFeedback(true));
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading(false))
    }
})
export const postFeedback = createAppAsyncThunk<any>("feedback/fetchFeedback", async (data, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setIsLoading(true))
    try {
        await feedbackAPI.postFeedback(data)
        dispatch(setFeedbackNew({...data, createdAt: new Date()}))
        dispatch(setModalSuccess(true))
    } catch (error) {
        dispatch(setModalErrorPost(true));
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading(false))
    }
})


export type FeedbackType = {
    data: FeedbackData[],
    modalError: boolean
    modalSuccess: boolean
    modalErrorPost: boolean

}
export type FeedbackData = {
    "id": string,
    "fullName": string,
    "imageSrc": string,
    "message": string,
    "rating": number,
    "createdAt": string
}
const initialState: FeedbackType = {
    data: [],
    modalError: false,
    modalSuccess: false,
    modalErrorPost: false
}
const FeedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedback(state: FeedbackType, action) {
            state.data = action.payload
        },
        setErrorGetFeedback(state: FeedbackType, action) {
            state.modalError = action.payload
        },
        setModalSuccess(state: FeedbackType, action) {
            state.modalSuccess = action.payload
        },
        setModalErrorPost(state: FeedbackType, action) {
            state.modalErrorPost = action.payload
        },
        setFeedbackNew(state: FeedbackType, action) {
           return {...state, data: [action.payload, ...state.data]}
        },
    }


});
export const {setFeedback, setErrorGetFeedback, setFeedbackNew, setModalSuccess, setModalErrorPost} = FeedbackSlice.actions;

export const feedbackSlice = FeedbackSlice.reducer;
