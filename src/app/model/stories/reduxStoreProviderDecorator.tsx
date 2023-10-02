import React from 'react'
import { Provider } from 'react-redux'
import { AppRootState } from 'app/model/store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksSlice } from 'features/TodolistList/model/tasks/tasksSlice'
import { todolistsSlice } from 'features/TodolistList/model/todolists/todolistsSlice'
import { appSlice, RequestStatus } from 'app/model/appSlice'
import { authSlice } from 'features/auth/model/authSlice'

const rootReducer = combineReducers({
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
})

const initialGlobalState = {
    todolists: [],
    tasks: {},
    app: {
        status: 'loading' as RequestStatus,
        error: null as null | string,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false,
    },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
