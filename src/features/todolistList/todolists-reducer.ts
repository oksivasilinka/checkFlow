import { todolistsApi } from 'features/todolistList/todolistsApi'
import { RequestStatus } from 'app/appReducer'
import { FilterValues, TodolistType } from 'features/todolistList/TodolistsList'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
import { ResultCode, TodolistApi, updateTodolistArgs } from 'features/todolistList/todolistsApiTypes'

export type TodolistDomain = TodolistType & {
    filter: FilterValues
    entityStatus: RequestStatus
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
                todolistId: string
                entityStatus: RequestStatus
            }>,
        ) => {
            const index = state.findIndex((el) => el.id === action.payload.todolistId)
            if (index != -1) state[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (_, action) => {
                return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((el) => el.id === action.payload.todolistId)
                if (index != -1) state.splice(index, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((el) => el.id === action.payload.todolistId)
                if (index != -1) state[index].title = action.payload.title
            })
            .addCase(clearTasksAndTodolists.type, () => {
                return []
            })
    },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApi[] }, undefined>(
    'todolists/fetchTodolists',
    async (_, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistsApi.getTodo()
            return { todolists: res.data }
        })
    },
)

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    'todolists/removeTodolist',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { todolistId } = arg
        return thunkTryCatch(thunkAPI, async () => {
            dispatch(todolistsActions.setEntityStatusTodo({ todolistId, entityStatus: 'loading' }))
            const res = await todolistsApi.deleteTodo(todolistId)
            if (res.data.resultCode === ResultCode.success) {
                return { todolistId }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
    'todolists/addTodolist',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistsApi.addTodo(arg.title)
            if (res.data.resultCode === ResultCode.success) {
                return { todolist: res.data.data.item }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

const updateTodolistTitle = createAppAsyncThunk<updateTodolistArgs, updateTodolistArgs>(
    'todolists/updateTodolistTitle',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { todolistId, title } = arg
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistsApi.updateTodo(todolistId, title)
            if (res.data.resultCode === ResultCode.success) {
                return { todolistId, title }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        })
    },
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {
    updateTodolistTitle,
    addTodolists: addTodolist,
    removeTodolists: removeTodolist,
    fetchTodolists,
}
