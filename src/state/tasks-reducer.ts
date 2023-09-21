import { todolistsActions } from './todolists-reducer'
import {
    AddTaskArgs,
    DeleteTaskArgs,
    Error,
    RESULT_CODES,
    TaskType,
    todolistApi,
    UpdateTaskArgs,
    UpdateTaskModel,
} from 'api/todolist-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/utils-error'
import { appActions } from 'state/app-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk } from 'utils/createAsyncThunk'

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
                    tasks[index] = { ...tasks[index], ...action.payload.domainModel }
                }
            })
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
        const res = await todolistApi.getTasks(todolistId)
        dispatch(appActions.setStatus({ status: 'succeeded' }))
        return { todolistId, tasks: res.data.items }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const deleteTasks = createAppAsyncThunk<
    {
        id: string
        todolistId: string
    },
    DeleteTaskArgs
>('tasks/deleteTasks', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setStatus({ status: 'loading' }))
    try {
        const res = await todolistApi.deleteTask(arg)
        if (res.data.resultCode === RESULT_CODES.OK) {
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
})

export const addTasks = createAppAsyncThunk<
    {
        task: TaskType
    },
    AddTaskArgs
>('tasks/addTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setStatus({ status: 'loading' }))
        const res = await todolistApi.addTasks(arg)
        if (res.data.resultCode === RESULT_CODES.OK) {
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

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
    'tasks/updateTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI
        const { todolistId, domainModel, id } = arg
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
                    ...domainModel,
                }
                dispatch(appActions.setStatus({ status: 'loading' }))
                const res = await todolistApi.updateTask(todolistId, apiModel, id)
                if (res.data.resultCode === RESULT_CODES.OK) {
                    dispatch(appActions.setStatus({ status: 'succeeded' }))
                    return { id, domainModel, todolistId }
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
    },
)

export const tasksReducer = slice.reducer
export const tasksThunks = { fetchTasks, addTasks, deleteTasks, updateTask }
