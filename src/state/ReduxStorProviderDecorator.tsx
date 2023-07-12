import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";

export const ReduxStorProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}