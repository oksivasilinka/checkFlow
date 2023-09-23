import { appActions } from 'app/appReducer'
import { Dispatch } from 'redux'
import { BaseResponse } from 'common/types'

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setError({ error }))
    } else {
        dispatch(appActions.setError({ error: 'Some error' }))
    }
    dispatch(appActions.setStatus({ status: 'failed' }))
}
