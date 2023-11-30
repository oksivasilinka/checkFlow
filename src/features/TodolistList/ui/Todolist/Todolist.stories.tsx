import type { Meta, StoryObj } from '@storybook/react'
import { StoreProviderDecorator } from 'app'
import { TaskPriorities, TaskStatuses } from 'common'
import { Todolist } from 'features'

const meta: Meta<typeof Todolist> = {
    title: 'TODOLIST/Todolist',
    component: Todolist,
    tags: ['autodocs'],
    decorators: [StoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Todolist>

export const TodolistStory: Story = {
    args: {
        todolist: {
            id: '1',
            title: 'What to buy',
            filter: 'all',
            entityStatus: 'idle',
        },
        tasks: [
            {
                id: '1',
                title: 'Bread',
                description: '',
                todoListId: '1',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '2',
                title: 'Water',
                description: '',
                todoListId: '1',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '3',
                title: 'Cheese',
                description: '',
                todoListId: '1',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '4',
                title: 'Juice',
                description: '',
                todoListId: '1',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '5',
                title: 'Fish',
                description: '',
                todoListId: '1',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
    },
}
