import { tasksReducer } from 'features/todolistList/tasks-reducer'
import { todolistsReducer } from 'features/todolistList/todolists-reducer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from 'app/appReducer'
import { authReducer } from 'features/auth/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer,
    },
})

export type AppRootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
// @ts-ignore
window.store = store
