import { Task } from 'features/TodolistList/ui/Todolist/Tasks/Task'
import React from 'react'
import { TaskResponse } from 'features/TodolistList/api/tasks.api.types'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolists.slice'
import s from './Tasks.module.css'

type Props = {
    tasks: TaskResponse[]
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
            <div className={s.textWrapper}>
                {!tasks.length && <span className={s.text}>Create your first task!</span>}
            </div>
        </>
    )
}
