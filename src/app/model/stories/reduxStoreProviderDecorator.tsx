import React from 'react'
import { Provider } from 'react-redux'
import { AppRootState } from 'app/model/store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksSlice } from 'features/TodolistList/model/tasks/tasksSlice'
import { todolistsSlice } from 'features/TodolistList/model/todolists/todolistsSlice'
import { appSlice, RequestStatus } from 'app/model/appSlice'
import { authSlice } from 'features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todolists: todolistsSlice,
        app: appSlice,
        auth: authSlice,
    },
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}
