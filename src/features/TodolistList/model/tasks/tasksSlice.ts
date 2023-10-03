import { todolistsThunks } from 'features/TodolistList/model/todolists/todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/commonActions'
import { createAppAsyncThunk } from 'common/utils'
import { tasksApi } from 'features/TodolistList/api/tasksApi'
import {
    AddTaskArgs,
    DeleteTaskArgs,
    TaskType,
    UpdateTaskArgs,
    UpdateTaskModel,
} from 'features/TodolistList/api/tasksApiTypes'
import { ResultCode } from 'features/TodolistList/api/todolistsApiTypes'

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

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
    'tasks/fetchTasks',
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
            return rejectWithValue(null)
        }
    },
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
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
            return rejectWithValue(res.data)
        }
    }
    return rejectWithValue(null)
})

export const tasksSlice = slice.reducer
export const tasksThunks = { fetchTasks, addTask, deleteTask, updateTask }
