
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setStatus = (status: RequestStatusType) => ({type: 'SET-STATUS', status}) as const

type ActionsType = setStatusType

export type setStatusType = ReturnType<typeof setStatus>