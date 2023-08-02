import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from './store';
import {combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [

    ] ,
    tasks: {

    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

