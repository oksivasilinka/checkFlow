import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {AxiosResponse} from "axios";
import {FilterValuesType, TodolistType} from "../App";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistACType

let initialState: TodolistDomainType[] = []

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [ ...state, {...action.todolist, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        case "SET-TODOLIST":
            return action.todolists.map((t) => ({...t, filter: 'all'}))
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


export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodo()
        .then((res: AxiosResponse) => {
            dispatch(setTodolistAC(res.data))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.addTodo(title)
        .then((res: AxiosResponse) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}


export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodo(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}


