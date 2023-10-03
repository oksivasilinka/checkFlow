import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'loading' as RequestStatus,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith('/pending')
                },
                (state) => {
                    state.status = 'loading'
                },
            )
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith('/rejected')
                },
                (state, action) => {
                    state.status = 'failed'
                    if (action.payload) {
                        if (action.type === 'todolists/addTodolist/rejected') return
                        if (action.type === 'tasks/addTask/rejected') return
                        state.error = action.payload.messages[0]
                    } else {
                        state.error = action.error.message ? action.error.message : 'Some error message'
                    }
                },
            )
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith('/fulfilled')
                },
                (state) => {
                    state.status = 'succeeded'
                },
            )
    },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
