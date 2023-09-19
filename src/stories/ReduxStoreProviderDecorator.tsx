import React from 'react'
import { Provider } from 'react-redux'
import { AppRootState } from 'state/store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from 'state/tasks-reducer'
import { todolistsReducer } from 'state/todolists-reducer'
import { appReducer, RequestStatus } from 'state/app-reducer'
import { authReducer } from 'state/auth-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
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
