import { todolistsApi } from 'features/TodolistList/api/todolistsApi'
import { RequestStatus } from 'app/model/appSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/commonActions'
import { createAppAsyncThunk, handleServerAppError } from 'common/utils'
import { ResultCode, TodolistApi, updateTodolistArgs } from 'features/TodolistList/api/todolistsApiTypes'

export type TodolistDomain = TodolistType & {
    filter: FilterValues
    entityStatus: RequestStatus
}
export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistType = {
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
                todolistId: string
                filter: FilterValues
            }>,
        ) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
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
            .addCase(fetchTodolists.fulfilled, (_, action) => {
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

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApi[] }, undefined>(
    'todolists/fetchTodolists',
    async () => {
        const res = await todolistsApi.getTodo()
        return { todolists: res.data }
    },
)

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
    'todolists/removeTodolist',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { id } = arg

        dispatch(todolistsActions.setEntityStatusTodo({ id, entityStatus: 'loading' }))
        const res = await todolistsApi.deleteTodo(id)
        if (res.data.resultCode === ResultCode.success) {
            return { id }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
    'todolists/addTodolist',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await todolistsApi.addTodo(arg.title)
        if (res.data.resultCode === ResultCode.success) {
            return { todolist: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data, false)
            return rejectWithValue(res.data)
        }
    },
)

const updateTodolistTitle = createAppAsyncThunk<updateTodolistArgs, updateTodolistArgs>(
    'todolists/updateTodolistTitle',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { id, title } = arg
        const res = await todolistsApi.updateTodo(id, title)
        if (res.data.resultCode === ResultCode.success) {
            return { id, title }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    },
)

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { updateTodolistTitle, addTodolist, removeTodolist, fetchTodolists }
