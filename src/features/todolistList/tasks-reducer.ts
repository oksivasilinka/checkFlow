import { todolistsThunks } from 'features/todolistList/todolists-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { tasksApi } from 'features/todolistList/tasksApi'
import {
    AddTaskArgs,
    DeleteTaskArgs,
    TaskType,
    UpdateTaskArgs,
    UpdateTaskModel,
} from 'features/todolistList/tasksApiTypes'
import { ResultCode } from 'features/todolistList/todolistsApiTypes'

export type TasksState = {
    [key: string]: TaskType[]
}

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((el) => el.id === action.payload.id)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(addTasks.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId]
                tasks.unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((el) => el.id === action.payload.id)
                if (index !== -1) {
                    tasks[index] = { ...tasks[index], ...action.payload.model }
                }
            })
            .addCase(todolistsThunks.addTodolists.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolists.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((el) => {
                    state[el.id] = []
                })
                return state
            })
            .addCase(clearTasksAndTodolists.type, () => {
                return {}
            })
    },
})

const fetchTasks = createAppAsyncThunk<
    {
        todolistId: string
        tasks: TaskType[]
    },
    string
>('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await tasksApi.getTasks(todolistId)
        return { todolistId, tasks: res.data.items }
    })
})

const deleteTasks = createAppAsyncThunk<
    {
        id: string
        todolistId: string
    },
    DeleteTaskArgs
>('tasks/deleteTasks', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await tasksApi.deleteTask(arg)
        if (res.data.resultCode === ResultCode.success) {
            return { todolistId: arg.todolistId, id: arg.id }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const addTasks = createAppAsyncThunk<
    {
        task: TaskType
    },
    AddTaskArgs
>('tasks/addTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await tasksApi.addTasks(arg)
        if (res.data.resultCode === ResultCode.success) {
            return { task: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>('tasks/updateTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { todolistId, model, id } = arg
    return thunkTryCatch(thunkAPI, async () => {
        let task = getState().tasks[todolistId].find((t) => t.id === id)
        if (task) {
            const apiModel: UpdateTaskModel = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                ...model,
            }
            const res = await tasksApi.updateTask(todolistId, apiModel, id)
            if (res.data.resultCode === ResultCode.success) {
                return { id, model, todolistId }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        }
        return rejectWithValue(null)
    })
})

export const tasksReducer = slice.reducer
export const tasksThunks = { fetchTasks, addTasks, deleteTasks, updateTask }
