import { RequestStatus } from 'app'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists, createAppAsyncThunk } from 'common'
import { ResultCode, TodolistApi, updateTodolistArgs, todolistsApi } from 'features'

export type TodolistDomain = TodolistResponse & {
    filter: FilterValues
    entityStatus: RequestStatus
}
export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistResponse = {
    id: string
    title: string
    filter: FilterValues
}

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomain[],
    reducers: {
        changeTodolistFilter: (
            state,
            action: PayloadAction<{
                id: string
                filter: FilterValues
            }>,
        ) => {
            const index = state.findIndex((el) => el.id === action.payload.id)
            if (index != -1) state[index].filter = action.payload.filter
        },
        setEntityStatusTodo: (
            state,
            action: PayloadAction<{
                id: string
                entityStatus: RequestStatus
            }>,
        ) => {
            const index = state.findIndex((el) => el.id === action.payload.id)
            if (index != -1) state[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodolists.fulfilled, (_, action) => {
                return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((el) => el.id === action.payload.id)
                if (index != -1) state.splice(index, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((el) => el.id === action.payload.id)
                if (index != -1) state[index].title = action.payload.title
            })
            .addCase(clearTasksAndTodolists.type, () => {
                return []
            })
    },
})

const getTodolists = createAppAsyncThunk<{ todolists: TodolistApi[] }, undefined>(
    'todolists/getTodolists',
    async () => {
        const res = await todolistsApi.getTodo()
        return { todolists: res.data }
    },
)

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
    'todolists/removeTodolist',
    async ({ id }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        dispatch(todolistsActions.setEntityStatusTodo({ id, entityStatus: 'loading' }))
        const res = await todolistsApi.deleteTodo(id)
        if (res.data.resultCode === ResultCode.success) {
            return { id }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
    'todolists/addTodolist',
    async ({ title }, { rejectWithValue }) => {
        const res = await todolistsApi.addTodo(title)
        if (res.data.resultCode === ResultCode.success) {
            return { todolist: res.data.data.item }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

const updateTodolistTitle = createAppAsyncThunk<updateTodolistArgs, updateTodolistArgs>(
    'todolists/updateTodolistTitle',
    async (arg, { rejectWithValue }) => {
        const { id, title } = arg
        const res = await todolistsApi.updateTodo(id, title)
        if (res.data.resultCode === ResultCode.success) {
            return { id, title }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { updateTodolistTitle, addTodolist, removeTodolist, getTodolists }
