import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistACType,} from './todolists-reducer';
import {TaskType} from "../Todolist";
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {AxiosResponse} from "axios";


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
            return {...state, [action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskId)}

        case 'ADD-TASK':
            return  {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]};

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];

            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
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
                action.todolist.forEach((el)=>{
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
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId}) as const
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    isDone,
    todolistId,
    taskId
}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    title,
    todolistId,
    taskId
}) as const

export const setTaskAC = ( todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASK', tasks, todolistId}) as const




export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res: AxiosResponse) => {
            dispatch(setTaskAC( todolistId, res.data.items ))
        })
}
