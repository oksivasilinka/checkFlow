import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { createAppAsyncThunk, clearTasksAndTodolists } from 'common'
import { authApi, ResultCode, FormData } from 'features'
import { appActions } from 'app'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.me.fulfilled),
            (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            },
        )
    },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, FormData>('auth/Login', async (arg, { rejectWithValue }) => {
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
        return rejectWithValue(res.data)
    }
})

const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/me', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authApi.me().finally(() => {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    })
    if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
    } else {
        return rejectWithValue(res.data)
    }
})

export const authSlice = slice.reducer
export const authThunks = { login, logout, me }
