import type { Meta, StoryObj } from '@storybook/react'
import React, { FC, useState } from 'react'
import { Task } from 'features/TodolistList/ui/Todolist/Tasks/Task/Task'
import { TaskType } from 'features/TodolistList/api/tasksApiTypes'
import { ReduxStoreProviderDecorator } from 'app/model/stories/reduxStoreProviderDecorator'
import { TaskPriorities, TaskStatuses } from 'common/enums'

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        task: {
            id: '111',
            title: 'JS',
            description: '',
            todoListId: '1',
            order: 0,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: '',
            deadline: '',
            addedDate: '',
        },
    },
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {
            id: '111',
            title: 'JS',
            description: '',
            todoListId: '1',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
        },
    },
}
type Props = {
    task: TaskType
}

const TaskWithHook: FC<Props> = (args) => {
    const [task, setTask] = useState(args.task)
    const changeTaskStatus = () => {
        if (task.status === TaskStatuses.Completed) {
            setTask({ ...task, status: TaskStatuses.New })
        } else {
            setTask({ ...task, status: TaskStatuses.Completed })
        }
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        setTask({ ...task, title: title })
    }
    return <Task task={task} />
}

export const TaskWithHookStory: Story = {
    render: (args) => <TaskWithHook task={args.task} />,
}
