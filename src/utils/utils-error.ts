import { Response } from 'api/todolist-api'
import { appActions } from 'state/app-reducer'
import { AppDispatch } from 'state/store'

export const handleServerNetworkError = (dispatch: AppDispatch, error: string) => {
    dispatch(appActions.setError({ error }))
    dispatch(appActions.setStatus({ status: 'failed' }))
}

export const handleServerAppError = <T>(dispatch: AppDispatch, data: Response<T>) => {
    const error = data.messages[0]

    if (error) {
        dispatch(appActions.setError({ error }))
    } else {
        dispatch(appActions.setError({ error: 'Some error' }))
    }
    dispatch(appActions.setStatus({ status: 'failed' }))
}
