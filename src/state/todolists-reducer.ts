import {RESULT_CODES, todolistApi} from "api/todolist-api"
import {AxiosResponse} from "axios"
import {appActions, RequestStatusType} from "./app-reducer"
import {handleServerAppError, handleServerNetworkError} from "utils/utils-error"
import {FilterValuesType, TodolistType} from "TodolistsList"
import {AppDispatchType} from "state/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index != -1) state.splice(index, 1)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index != -1) state[index].title = action.payload.title
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index != -1) state[index].filter = action.payload.filter
        },
        setEntityStatusTodo: (state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index != -1) state[index].entityStatus = action.payload.entityStatus
        },
        setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map(t => ({...t, filter: "all", entityStatus: "idle"}))
        },
    }
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


export const getTodolistTC = () => (dispatch: AppDispatchType) => {
    todolistApi
        .getTodo()
        .then((res: AxiosResponse) => {
            dispatch(todolistsActions.setTodolist({todolists: res.data}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(appActions.setStatus({status: "succeeded"}))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: AppDispatchType) => {
    dispatch(appActions.setStatus({status: "loading"}))
    dispatch(todolistsActions.setEntityStatusTodo({todolistId, entityStatus: "loading"}))
    todolistApi
        .deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.removeTodolist({todolistId}))
                dispatch(appActions.setStatus({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
            dispatch(todolistsActions.setEntityStatusTodo({todolistId, entityStatus: "failed"}))
        })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatchType) => {
    dispatch(appActions.setStatus({status: "loading"}))
    todolistApi
        .addTodo(title)
        .then((res: AxiosResponse) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(appActions.setStatus({status: "succeeded"}))
        })
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppDispatchType) => {
    dispatch(appActions.setStatus({status: "loading"}))
    todolistApi
        .updateTodo(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todolistsActions.changeTodolistTitle({todolistId, title}))
                dispatch(appActions.setStatus({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}
