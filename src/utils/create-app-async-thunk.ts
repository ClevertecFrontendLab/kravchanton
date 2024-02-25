import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@redux/configure-store";

/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: null | any;
}>();
