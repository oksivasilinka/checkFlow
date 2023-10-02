import { AppDispatch, AppRootState } from 'app/store'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { BaseResponse } from 'common/types'

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | BaseResponse>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
}
