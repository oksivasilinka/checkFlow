import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from 'features/todolistList/todolistsApiTypes'
import { authApi } from 'features/auth/authApi'
import type { FormType } from 'features/auth'
import { appActions } from 'app/appReducer'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(me.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormType>('auth/login', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setStatus({ status: 'loading' }))
        const res = await authApi.login(arg)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setStatus({ status: 'loading' }))
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
            return { isLoggedIn: false }
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(clearTasksAndTodolists())
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const me = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/me', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setStatus({ status: 'loading' }))
        const res = await authApi.me()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    }
})

export const authReducer = slice.reducer
export const authThunks = { login, logout, me }
