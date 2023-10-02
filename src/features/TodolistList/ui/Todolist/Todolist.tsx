import React, { FC, useEffect } from 'react'
import { AddItemForm } from 'common/components'
import { tasksThunks } from 'features/TodolistList/model/tasks/tasksSlice'
import { TaskType } from 'features/TodolistList/api/tasksApiTypes'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain } from 'features/TodolistList/model/todolists/todolistsSlice'
import { FilterTasksButton } from 'features/TodolistList/ui/Todolist/FilterTasksButton/FilterTasksButton'
import { Tasks } from 'features/TodolistList/ui/Todolist/Tasks/Tasks'
import { TodolistTitle } from 'features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle'

type Props = {
    todolistId: string
    tasks: TaskType[]
    todolist: TodolistDomain
}

export const Todolist: FC<Props> = React.memo(({ todolistId, tasks, todolist }) => {
    const { fetchTasks, addTask } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolistId)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTask({ todolistId, title }).unwrap()
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
            <Tasks tasks={tasks} todolist={todolist} />
            <FilterTasksButton todolist={todolist} />
        </div>
    )
})
