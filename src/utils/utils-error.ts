import { ResponseType } from "api/todolist-api"
import {appActions} from "state/app-reducer";
import {AppDispatchType} from "state/store";

export const handleServerNetworkError = (dispatch: AppDispatchType, error: string) => {
  dispatch(appActions.setError({error}))
  dispatch(appActions.setStatus({status: "failed"}))
}

export const handleServerAppError = <T>(dispatch: AppDispatchType, data: ResponseType<T>) => {
  const error = data.messages[0]

  if (error) {
    dispatch(appActions.setError({error}))
  } else {
    dispatch(appActions.setError({error: "Some error"}))
  }
  dispatch(appActions.setStatus({status: "failed"}))
}
