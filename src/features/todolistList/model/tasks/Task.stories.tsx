import type { Meta, StoryObj } from '@storybook/react'
import React, { FC, useState } from 'react'
import { Task } from 'features/todolistList/ui/todolist/Tasks/Task/Task'
import { TaskType } from 'features/todolistList/api/tasksApiTypes'

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        // Task: {id: '111', title: 'JS', isDone: true},
    },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    args: {
        // Task: {id: '111', title: 'JS', isDone: false},
    },
}
type Props = {
    task: TaskType
}

const TaskWithHook: FC<Props> = (args) => {
    const [task, setTask] = useState(args.task)
    const changeTaskStatus = () => {
        // setTask({...Task, isDone: !Task.isDone})
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        setTask({ ...task, title: title })
    }
    return <Task task={task} />
}

export const TaskWithHookStory: Story = {
    render: (args) => <TaskWithHook task={args.task} />,
}
