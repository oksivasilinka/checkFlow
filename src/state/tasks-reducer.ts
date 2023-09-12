import {todolistsActions} from "./todolists-reducer"
import {Dispatch} from "redux"
import {ErrorType, RESULT_CODES, TaskType, todolistApi, UpdateDomainTaskModel, UpdateTaskModel} from "api/todolist-api"
import axios from "axios"
import {AppDispatchType, AppRootStateType} from "./store"
import {handleServerAppError, handleServerNetworkError} from "utils/utils-error"
import {appActions} from "state/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = { [key: string]: TaskType[] }


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ id: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModel, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTask: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.setTodolist, (state, action) => {
                action.payload.todolists.forEach((el) => {
                    state[el.id] = []
                })
                return state
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions


export const getTaskTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    try {
        const res = await todolistApi.getTasks(todolistId)
        dispatch(tasksActions.setTask({todolistId, tasks: res.data.items}))
        dispatch(appActions.setStatus({status: "succeeded"}))
    } catch (e) {
        handleServerNetworkError(dispatch, (e as ErrorType).message)
    }
}

export const deleteTaskTC = (todolistId: string, id: string) => async (dispatch: AppDispatchType) => {
    dispatch(appActions.setStatus({status: "loading"}))
    try {
        const res = await todolistApi.deleteTask(todolistId, id)
        if (res.data.resultCode === RESULT_CODES.OK) {
            dispatch(tasksActions.removeTask({id, todolistId}))
            dispatch(appActions.setStatus({status: "succeeded"}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as ErrorType).message)
    }
}

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: AppDispatchType) => {
    dispatch(appActions.setStatus({status: "loading"}))
    try {
        const res = await todolistApi.addTasks(todolistId, title)
        if (res.data.resultCode === RESULT_CODES.OK) {
            dispatch(tasksActions.addTask({task: res.data.data.item}))
            dispatch(appActions.setStatus({status: "succeeded"}))
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

export const updateTaskTC =
    (todolistId: string, id: string, domainModel: UpdateDomainTaskModel) =>
        async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
            let task = getState().tasks[todolistId].find((t) => t.id === id)
            if (task) {
                const model: UpdateTaskModel = {
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                    priority: task.priority,
                    startDate: task.startDate,
                    status: task.status,
                    ...domainModel,
                }
                dispatch(appActions.setStatus({status: "loading"}))
                try {
                    const res = await todolistApi.updateTask(todolistId, model, id)
                    if (res.data.resultCode === RESULT_CODES.OK) {
                        dispatch(tasksActions.updateTask({id, model, todolistId}))
                        dispatch(appActions.setStatus({status: "succeeded"}))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                } catch (e) {
                    handleServerNetworkError(dispatch, (e as ErrorType).message)
                }
            }
        }
