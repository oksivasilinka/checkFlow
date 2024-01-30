import type { Meta, StoryObj } from '@storybook/react'
import { App, Header } from 'app'
import { ErrorSnackbar } from 'common'
import { Login, TodolistsList } from 'features'

const meta: Meta<typeof App> = {
    title: 'PAGES/App',
    component: App,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof App>

export const AppStory: Story = {
    render: () => (
        <>
            <Header />
            <TodolistsList />
            <ErrorSnackbar />
        </>
    ),
}

export const AppLoginStory: Story = {
    render: () => (
        <>
            <Header />
            <Login />
            <ErrorSnackbar />
        </>
    ),
}
