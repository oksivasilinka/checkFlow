import type { Meta, StoryObj } from '@storybook/react'
import App from 'app/ui/App/App'
import { ReduxStoreProviderDecorator } from 'app/model/stories/reduxStoreProviderDecorator'
import { Provider } from 'react-redux'
import { store } from 'app/model/store'
import { BrowserRouter } from 'react-router-dom'

const meta: Meta<typeof App> = {
    title: 'TODOLIST/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof App>

export const AppWithReduxStory: Story = {
    render: () => (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    ),
}
