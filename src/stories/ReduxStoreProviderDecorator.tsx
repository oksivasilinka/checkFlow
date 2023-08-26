import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from '../state/store';
import {combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer';
import {appReducer, RequestStatusType} from "../state/tests/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [] ,
    tasks: {},
    app: {
        status: 'loading' as RequestStatusType
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

