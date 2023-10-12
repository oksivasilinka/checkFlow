import React, { useEffect } from 'react'
import { AddItemForm } from 'common/components'
import { tasksThunks } from 'features/TodolistList/model/tasks/tasks.slice'
import { TaskResponse } from 'features/TodolistList/api/tasks.api.types'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolists.slice'
import { FilterTasksButton } from 'features/TodolistList/ui/Todolist/FilterTasksButton'
import { Tasks } from 'features/TodolistList/ui/Todolist/Tasks'
import { TodolistTitle } from 'features/TodolistList/ui/Todolist/TodolistTitle'
import s from './Todolist.module.css'

type Props = {
    tasks: TaskResponse[]
    todolist: TodolistDomain
}

export const Todolist = React.memo(({ tasks, todolist }: Props) => {
    const { getTasks, addTask } = useActions(tasksThunks)
    const { id, entityStatus } = todolist

    useEffect(() => {
        getTasks(id)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTask({ id, title }).unwrap()
    }

    return (
        <div className={s.todolistWrapper}>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={entityStatus === 'loading'} />
            <Tasks tasks={tasks} todolist={todolist} />
            <FilterTasksButton todolist={todolist} />
        </div>
    )
})
