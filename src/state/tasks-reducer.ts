import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistACType,
} from './todolists-reducer';
import {Dispatch} from "redux";
import {
    ErrorType, RESULT_CODES, TaskType, todolistApi, UpdateDomainTaskModelType, UpdateTaskModelType
} from "../api/todolist-api";
import axios from "axios";
import {AppRootStateType} from "./store";
import {SetErrorType, setStatus, SetStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/utils-error";

export type TasksStateType = { [key: string]: TaskType[] }
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type SetTaskACType = ReturnType<typeof setTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistACType
    | SetTaskACType
    | SetStatusType
    | SetErrorType
    | UpdateTaskACType

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case 'UPDATE-TASK' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TODOLIST":
            const copyState = {...state}
            action.todolists.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState
        case "SET-TASK":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', todolistId, taskId}) as const
export const addTaskAC = (task: TaskType, todolistId: string) => ({type: 'ADD-TASK', task, todolistId}) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId}) as const
export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASK', tasks, todolistId}) as const


export const getTaskTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const res = await todolistApi.getTasks(todolistId)
        dispatch(setTaskAC(todolistId, res.data.items))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, (e as ErrorType).message)
    }
}


export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const res = await todolistApi.deleteTask(todolistId, taskId)
        if (res.data.resultCode === RESULT_CODES.OK) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as ErrorType).message)
    }
}


export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const res = await todolistApi.addTasks(todolistId, title)
        if (res.data.resultCode === RESULT_CODES.OK) {
            dispatch(addTaskAC(res.data.data.item, todolistId))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response.data.error : e.message
            handleServerNetworkError(dispatch, error)
        }
        handleServerNetworkError(dispatch, (e as ErrorType).message)
    }
}


export const updateTaskTC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[todolistId].find((t) => t.id === id)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                ...domainModel
            }
            dispatch(setStatus('loading'))
            try {
                const res = await todolistApi.updateTask(todolistId, model, id,)
                if (res.data.resultCode === RESULT_CODES.OK) {
                    dispatch(updateTaskAC(id, domainModel, todolistId))
                    dispatch(setStatus('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            } catch (e) {
                handleServerNetworkError(dispatch, (e as ErrorType).message)
            }
        }
    }
