import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistACType,} from './todolists-reducer';
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "./store";

export type TasksStateType = { [key: string]: TaskType[] }
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type setTaskACType = ReturnType<typeof setTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType | SetTodolistACType | setTaskACType

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]};

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                status: action.status
            } : t)
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []};

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case "SET-TODOLIST":
            const copyState = {...state}
            action.todolist.forEach((el) => {
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
    todolistApi.getTasks(todolistId)
        .then((res: AxiosResponse) => {
            dispatch(setTaskAC(todolistId, res.data.items))
        })
}


export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}


export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.addTasks(todolistId, title)
        .then((res: AxiosResponse) => {
            dispatch(addTaskAC(res.data.items, todolistId))
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
        todolistApi.updateTask(todolistId, model, id,)
            .then((res: AxiosResponse) => {
                dispatch(changeTaskStatusAC(id, status, todolistId))
            })


    }

}
