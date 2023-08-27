import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistACType,
} from './todolists-reducer';
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "./store";
import {setError, SetErrorType, setStatus, SetStatusType} from "./tests/app-reducer";

export type TasksStateType = { [key: string]: TaskType[] }
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTaskACType = ReturnType<typeof setTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistACType
    | SetTaskACType
    | SetStatusType
    | SetErrorType

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                status: action.status
            } : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                title: action.title
            } : t)
            return ({...state})
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}) as const

export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASK', tasks, todolistId}) as const


export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.getTasks(todolistId)
        .then((res: AxiosResponse) => {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setStatus('succeeded'))
        })
}


export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatus('succeeded'))
        })
}


export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.addTasks(todolistId, title)
        .then((res: AxiosResponse) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todolistId))
                dispatch(setStatus('succeeded'))
            } else {
                const error = res.data.messages
                if (error) {
                    dispatch(setError(error))
                } else {
                    dispatch(setError('Some error'))
                }
                dispatch(setStatus('failed'))
            }
        })
        .catch((error) => {
            dispatch(setError(error.message))
            dispatch(setStatus('failed'))
        })
}

export const updateTaskStatusTC = (todolistId: string, id: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistId].find((t) => t.id === id)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status
        }
        dispatch(setStatus('loading'))
        todolistApi.updateTask(todolistId, model, id,)
            .then((res) => {
                dispatch(changeTaskStatusAC(id, status, todolistId))
                dispatch(setStatus('succeeded'))
            })
    }
}

export const updateTaskTitleTC = (todolistId: string, id: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistId].find((t) => t.id === id)
    if (task) {
        const model: UpdateTaskModelType = {
            title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status
        }
        dispatch(setStatus('loading'))
        todolistApi.updateTask(todolistId, model, id,)
            .then((res) => {
                dispatch(changeTaskTitleAC(id, title, todolistId))
                dispatch(setStatus('succeeded'))
            })
    }
}
