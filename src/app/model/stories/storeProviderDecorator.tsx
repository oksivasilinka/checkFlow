import React from 'react'
import { Provider } from 'react-redux'
import { tasksSlice } from 'features/TodolistList/model/tasks/tasks.slice'
import { todolistsSlice } from 'features/TodolistList/model/todolists/todolists.slice'
import { appSlice } from 'app/model/app.slice'
import { authSlice } from 'features/auth/model/auth.slice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todolists: todolistsSlice,
        app: appSlice,
        auth: authSlice,
    },
})

export const StoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}
