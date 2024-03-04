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
        console.log(response.data)
    } catch (error) {
        history.push('/result/error-login', {state: history.location.pathname});
        return rejectWithValue(error)
    } finally {
        dispatch(setIsLoading(false))
    }
})


export type FeedbackType = {
    "id": string ,
    "fullName": string,
    "imageSrc": string,
    "message": string,
    "rating": number,
    "createdAt": string
}
const initialState: FeedbackType[] = []
const FeedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedback(state: FeedbackType, action) {
            return action.payload
        },}

});
export const {setFeedback} = FeedbackSlice.actions;

export const feedbackSlice = FeedbackSlice.reducer;
