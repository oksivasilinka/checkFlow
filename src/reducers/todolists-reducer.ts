import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: tsarType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists((todolists.filter(el => el.id !== todolistId)))
            // delete tasks[todolistId]
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            // setTodolists([newTodolist, ...todolists])
            // setTasks({...tasks, [todolistId]: []})
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            // setTodolists(todolists.map(el => el.id === todolistTd ? {...el, title: updateTitle} : el))
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}
export type tsarType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST', id
    } as const
}

export const addTodolistAC = (title: string ) => {
    return {
        type: 'ADD-TODOLIST',title: title, todolistId: v1()
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}
