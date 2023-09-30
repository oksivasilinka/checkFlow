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
        dispatch(appActions.setError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
    }

    dispatch(appActions.setStatus({ status: 'failed' }))
}
