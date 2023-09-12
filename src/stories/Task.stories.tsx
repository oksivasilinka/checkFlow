import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import React, { FC, useState } from "react"
import { Task, TaskPropsType } from "Task"

const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  tags: ["autodocs"],
  args: {
    // task: {id: '111', title: 'JS', isDone: true},
    changeTaskStatus: action("changeTaskStatus"),
    changeTaskTitle: action("changeTaskTitle"),
    removeTask: action("removeTask"),
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
  args: {
    // task: {id: '111', title: 'JS', isDone: false},
  },
}

const TaskWithHook: FC<TaskPropsType> = (args) => {
  const [task, setTask] = useState(args.task)
  const changeTaskStatus = () => {
    // setTask({...task, isDone: !task.isDone})
  }
  const changeTaskTitle = (taskId: string, title: string) => {
    setTask({ ...task, title: title })
  }
  return (
    <Task
      task={task}
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
      removeTask={args.removeTask}
    />
  )
}

export const TaskWithHookStory: Story = {
  render: (args) => (
    <TaskWithHook
      task={args.task}
      changeTaskStatus={args.changeTaskStatus}
      changeTaskTitle={args.changeTaskTitle}
      removeTask={args.removeTask}
    />
  ),
}
