import {authSlice} from "@pages/auth/model/auth.slice";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import {feedbackSlice} from "@pages/feedback/model/feedback.slice";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});



export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authSlice,
        feedback: feedbackSlice

    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
