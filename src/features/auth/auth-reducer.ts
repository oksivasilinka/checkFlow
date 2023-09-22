import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from 'app/store'
import { appActions } from 'app/app-reducer'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { authApi } from 'features/auth/authApi'
import { ResultCode } from 'features/todolistList/todolistsApiTypes'

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const loginTC = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
            dispatch(appActions.setStatus({ status: 'succeeded' }))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    }
}

export const meTC = () => async (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    try {
        const res = await authApi.me()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
            dispatch(appActions.setStatus({ status: 'succeeded' }))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    }
}

export const logoutTC = () => async (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
            dispatch(appActions.setStatus({ status: 'succeeded' }))
            dispatch(clearTasksAndTodolists())
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
    }
}
