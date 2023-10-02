import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { ResultCode } from 'features/todolistList/api/todolistsApiTypes'
import { authApi } from 'features/auth/api/authApi'
import { appActions } from 'app/appReducer'
import { FormType } from 'features/auth/lib/useLogin'

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

const login = createAppAsyncThunk<
    {
        isLoggedIn: boolean
    },
    FormType
>('auth/login', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.login(arg)
        if (res.data.resultCode === 0) {
            return { isLoggedIn: true }
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            handleServerAppError(dispatch, res.data, isShowAppError)
            return rejectWithValue(res.data)
        }
    })
})

const logout = createAppAsyncThunk<
    {
        isLoggedIn: boolean
    },
    undefined
>('auth/logout', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.success) {
            return { isLoggedIn: false }
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(clearTasksAndTodolists())
            return rejectWithValue(null)
        }
    })
})

const me = createAppAsyncThunk<
    {
        isLoggedIn: boolean
    },
    undefined
>('auth/me', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.me()
        if (res.data.resultCode === ResultCode.success) {
            return { isLoggedIn: true }
        } else {
            return rejectWithValue(null)
        }
    }).finally(() => {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    })
})

export const authReducer = slice.reducer
export const authThunks = { login, logout, me }
