import React, { useEffect } from 'react'
import { AddItemForm } from 'common/components'
import { tasksThunks } from 'features/TodolistList/model/tasks/tasks.slice'
import { TaskType } from 'features/TodolistList/api/tasks.api.types'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolists.slice'
import { FilterTasksButton } from 'features/TodolistList/ui/Todolist/FilterTasksButton/FilterTasksButton'
import { Tasks } from 'features/TodolistList/ui/Todolist/Tasks/Tasks'
import { TodolistTitle } from 'features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle'

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomain
}

export const Todolist = React.memo(({ tasks, todolist }: Props) => {
    const { getTasks, addTask } = useActions(tasksThunks)
    const { id } = todolist

    useEffect(() => {
        getTasks(id)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTask({ id, title }).unwrap()
    }

    return (
        <>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
            <Tasks tasks={tasks} todolist={todolist} />
            <FilterTasksButton todolist={todolist} />
        </>
    )
})
