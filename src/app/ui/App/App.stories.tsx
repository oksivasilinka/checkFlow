import type { Meta, StoryObj } from '@storybook/react'
import App from 'app/ui/App/App'
import { ReduxStoreProviderDecorator } from 'app/model/stories/reduxStoreProviderDecorator'

const meta: Meta<typeof App> = {
    title: 'TODOLIST/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof App>

export const AppWithReduxStory: Story = {
    // render: () => <Provider store={store}><App/></Provider>
}
