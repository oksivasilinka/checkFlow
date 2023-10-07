import { Task } from 'features/TodolistList/ui/Todolist/Tasks/Task/Task'
import React from 'react'
import { TaskType } from 'features/TodolistList/api/tasks.api.types'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolists.slice'

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomain
}

export const Tasks = ({ tasks, todolist }: Props) => {
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
