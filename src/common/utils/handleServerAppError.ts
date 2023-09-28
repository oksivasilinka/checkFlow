import { appActions } from 'app/appReducer'
import { Dispatch } from 'redux'
import { BaseResponse } from 'common/types'

/**
 * Обработчик ошибок с сервера.
 *
 * @param data  - ответ от сервера в формате BaseResponse<T>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>, showError: boolean = true): void => {
    if (showError) {
        const error = data.messages[0]
        if (error) {
            dispatch(appActions.setError({ error }))
        } else {
            dispatch(appActions.setError({ error: 'Some error' }))
        }
    }

    dispatch(appActions.setStatus({ status: 'failed' }))
}
