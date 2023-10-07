import { tasksSlice } from 'features/TodolistList/model/tasks/tasks.slice'
import { todolistsSlice } from 'features/TodolistList/model/todolists/todolists.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appSlice } from 'app/model/app.slice'
import { authSlice } from 'features/auth/model/auth.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todolists: todolistsSlice,
        app: appSlice,
        auth: authSlice,
    },
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// @ts-ignore
window.store = store
