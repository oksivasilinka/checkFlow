import { todolistsThunks } from 'features/todolistList/todolists-reducer'
import { appActions } from 'app/appReducer'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
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
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
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
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const res = await tasksApi.getTasks(todolistId)
        dispatch(appActions.setStatus({ status: 'succeeded' }))
        return { todolistId, tasks: res.data.items }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const deleteTasks = createAppAsyncThunk<{ id: string; todolistId: string }, DeleteTaskArgs>(
    'tasks/deleteTasks',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        dispatch(appActions.setStatus({ status: 'loading' }))
        try {
            const res = await tasksApi.deleteTask(arg)
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({ status: 'succeeded' }))
                return { todolistId: arg.todolistId, id: arg.id }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, (e as Error).message)
            return rejectWithValue(null)
        }
    },
)

const addTasks = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>('tasks/addTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setStatus({ status: 'loading' }))
        const res = await tasksApi.addTasks(arg)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({ status: 'succeeded' }))
            return { task: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>('tasks/updateTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { todolistId, model, id } = arg
    try {
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
            dispatch(appActions.setStatus({ status: 'loading' }))
            const res = await tasksApi.updateTask(todolistId, apiModel, id)
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({ status: 'succeeded' }))
                return { id, model, todolistId }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        }
        return rejectWithValue(null)
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const tasksReducer = slice.reducer
export const tasksThunks = { fetchTasks, addTasks, deleteTasks, updateTask }
