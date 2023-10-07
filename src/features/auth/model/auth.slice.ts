import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import { ResultCode } from 'features/TodolistList/api/todolists.api.types'
import { authApi } from 'features/auth/api/auth.api'
import { appActions } from 'app/model/app.slice'
import { FormType } from 'features/auth/lib/useLogin'
import { clearTasksAndTodolists } from 'common/actions/common.actions'

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

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormType>('auth/Login', async (arg, { rejectWithValue }) => {
    const res = await authApi.login(arg)
    if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
    } else {
        return rejectWithValue(res.data)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: false }
    } else {
        dispatch(clearTasksAndTodolists())
        return rejectWithValue(null)
    }
})

const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/me', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authApi.me()
    if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
        return { isLoggedIn: true }
    } else {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
        return rejectWithValue(res.data)
    }
})

export const authSlice = slice.reducer
export const authThunks = { login, logout, me }
