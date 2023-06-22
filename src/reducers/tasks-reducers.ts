import {TaskAssocType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType |
    ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

export const tasksReducer = (state: TaskAssocType, action: ActionsType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
            [action.todolistId]: state[action.todolistId].filter(el=> el.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state,
                [action.todolistId]: [ newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS' :
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        case 'CHANGE-TITLE-STATUS' :
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)}
        case 'ADD-TODOLIST':

            return {...state,
                [action.todolistId]: [ ]
            }
        case 'REMOVE-TODOLIST':
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            let {[action.id]: [], ...rest} = state
            return rest
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TITLE-STATUS', payload: {taskId, title, todolistId}} as const
}