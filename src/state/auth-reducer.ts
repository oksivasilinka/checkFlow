import {Dispatch} from 'redux'
import {setIsInitialized, SetIsInitializedType, setStatus, SetStatusType} from "./app-reducer";
import {authApi} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/utils-error";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(setIsInitialized(true))
    }
}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(setIsInitialized(true))
    }
}


export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }).message)
    } finally {
        dispatch(setIsInitialized(true))
    }
}
// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusType | SetIsInitializedType