import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists, createAppAsyncThunk } from 'common'
import {
    AddTaskArgs,
    DeleteTaskArgs,
    ResultCode,
    TaskResponse,
    tasksApi,
    todolistsThunks,
    UpdateTaskArgs,
    UpdateTaskModel,
} from 'features'

export type TasksState = Record<string, TaskResponse[]>

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((el) => el.id === action.payload.id)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
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
                delete state[action.payload.id]
            })
            .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
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

const getTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskResponse[] }, string>(
    'tasks/getTasks',
    async (todolistId: string) => {
        const res = await tasksApi.getTasks(todolistId)
        return { todolistId, tasks: res.data.items }
    },
)

const deleteTask = createAppAsyncThunk<{ id: string; todolistId: string }, DeleteTaskArgs>(
    'tasks/deleteTasks',
    async (arg, { rejectWithValue }) => {
        const res = await tasksApi.deleteTask(arg)
        if (res.data.resultCode === ResultCode.success) {
            return { todolistId: arg.todolistId, id: arg.id }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

const addTask = createAppAsyncThunk<{ task: TaskResponse }, AddTaskArgs>(
    'tasks/addTask',
    async (arg, { rejectWithValue }) => {
        const res = await tasksApi.addTasks(arg)
        if (res.data.resultCode === ResultCode.success) {
            return { task: res.data.data.item }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>('tasks/updateTask', async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { todolistId, model, id } = arg
    const task = getState().tasks[todolistId].find((t) => t.id === id)
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
            return rejectWithValue(res.data)
        }
    }
    return rejectWithValue(null)
})

export const tasksSlice = slice.reducer
export const tasksThunks = { getTasks, addTask, deleteTask, updateTask }
