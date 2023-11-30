import { Provider } from 'react-redux'
import { authSlice, tasksSlice, todolistsSlice } from 'features'
import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from 'app/model/app.slice'

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
