import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: tsarType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists((todolists.filter(el => el.id !== todolistId)))
            // delete tasks[todolistId]
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistsType = {id: todolistId, title: action.payload.title, filter: 'all'}
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
type tsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
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
