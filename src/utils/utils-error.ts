import { Response } from 'api/todolist-api'
import { appActions } from 'state/app-reducer'
import { AppDispatch } from 'state/store'
import { Dispatch } from 'redux'
import axios from 'axios'

export const handleServerNetworkError = (dispatch: AppDispatch, err: unknown): void => {
    let errorMessage = 'Some error occurred'
    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`
    } else {
        errorMessage = JSON.stringify(err)
    }
    dispatch(appActions.setError({ error: errorMessage }))
    dispatch(appActions.setStatus({ status: 'failed' }))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: Response<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setError({ error }))
    } else {
        dispatch(appActions.setError({ error: 'Some error' }))
    }
    dispatch(appActions.setStatus({ status: 'failed' }))
}
