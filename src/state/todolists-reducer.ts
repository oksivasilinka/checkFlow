import { RESULT_CODES, todolistApi } from 'api/todolist-api'
import { AxiosResponse } from 'axios'
import { appActions, RequestStatus } from './app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/utils-error'
import { FilterValues, TodolistType } from 'TodolistsList'
import { AppDispatch } from 'state/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'

export type TodolistDomain = TodolistType & {
    filter: FilterValues
    entityStatus: RequestStatus
}

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomain[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
            if (index != -1) state.splice(index, 1)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
            if (index != -1) state[index].title = action.payload.title
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValues }>) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
            if (index != -1) state[index].filter = action.payload.filter
        },
        setEntityStatusTodo: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatus }>) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
            if (index != -1) state[index].entityStatus = action.payload.entityStatus
        },
        setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearTasksAndTodolists.type, () => {
            return []
        })
    },
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const getTodolistTC = () => (dispatch: AppDispatch) => {
    todolistApi
        .getTodo()
        .then((res: AxiosResponse) => {
            dispatch(todolistsActions.setTodolist({ todolists: res.data }))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    dispatch(todolistsActions.setEntityStatusTodo({ todolistId, entityStatus: 'loading' }))
    todolistApi
        .deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.removeTodolist({ todolistId }))
                dispatch(appActions.setStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
            dispatch(todolistsActions.setEntityStatusTodo({ todolistId, entityStatus: 'failed' }))
        })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    todolistApi
        .addTodo(title)
        .then((res: AxiosResponse) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
        })
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(appActions.setStatus({ status: 'loading' }))
    todolistApi
        .updateTodo(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }))
                dispatch(appActions.setStatus({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
