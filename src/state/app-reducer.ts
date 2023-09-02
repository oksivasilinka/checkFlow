
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setStatus = (status: RequestStatusType) => ({type: 'SET-STATUS', status}) as const
export const setError = (error: null | string) => ({type: 'SET-ERROR', error}) as const
export const setIsInitialized = (isInitialized: boolean) => ({type: 'SET-IS-INITIALIZED', isInitialized}) as const

type ActionsType = SetStatusType | SetErrorType | SetIsInitializedType

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type SetIsInitializedType = ReturnType<typeof setIsInitialized>