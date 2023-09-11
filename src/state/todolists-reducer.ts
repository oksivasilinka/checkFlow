import {Dispatch} from "redux";
import {RESULT_CODES, todolistApi} from "../api/todolist-api";
import {AxiosResponse} from "axios";
import {RequestStatusType, SetErrorType, setStatus, SetStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/utils-error";
import {FilterValuesType, TodolistType} from "../TodolistsList";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>
export type SetEntityStatusTodoACType = ReturnType<typeof setEntityStatusTodoAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistACType
    | SetStatusType
    | SetEntityStatusTodoACType
    | SetErrorType

let initialState: TodolistDomainType[] = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {...action.todolist, filter: 'all', entityStatus: 'idle'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        case "SET-TODOLIST":
            return action.todolists.map((t) => ({...t, filter: 'all', entityStatus: 'idle'}))
        case "SET-ENTITY-STATUS":
            return state.map((t) => (t.id === action.id ? {...t, entityStatus: action.status} : t))
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}) as const
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    id: todolistId
}) as const
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    id: todolistId
}) as const

export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists}) as const
export const setEntityStatusTodoAC = (id: string, status: RequestStatusType) => ({
    type: 'SET-ENTITY-STATUS',
    status,
    id
}) as const


export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodo()
        .then((res: AxiosResponse) => {
            dispatch(setTodolistAC(res.data))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setStatus('succeeded'))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    dispatch(setEntityStatusTodoAC(todolistId, 'loading'))
    todolistApi.deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
            dispatch(setEntityStatusTodoAC(todolistId, 'failed'))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.addTodo(title)
        .then((res: AxiosResponse) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setStatus('succeeded'))
        })
}


export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.updateTodo(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}


