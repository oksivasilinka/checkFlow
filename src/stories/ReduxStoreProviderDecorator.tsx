import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from '../state/store';
import {combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer';
import {appReducer, RequestStatusType} from "../state/app-reducer";
import {authReducer} from "../state/login-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState = {
    todolists: [] ,
    tasks: {},
    app: {
        status: 'loading' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

