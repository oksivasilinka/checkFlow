import { Task } from 'features/TodolistList/ui/Todolist/Tasks/Task/Task'
import React, { FC } from 'react'
import { TaskType } from 'features/TodolistList/api/tasksApiTypes'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolistsSlice'

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomain
}

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => !t.status)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status)
    }

    return (
        <>
            {tasksForTodolist?.map((t) => {
                return <Task key={t.id} task={t} />
            })}
        </>
    )
}
