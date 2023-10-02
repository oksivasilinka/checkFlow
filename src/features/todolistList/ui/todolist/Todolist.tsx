import React, { FC, useEffect } from 'react'
import { AddItemForm } from 'common/components'
import { tasksThunks } from 'features/todolistList/model/tasks/tasks-reducer'
import { TaskType } from 'features/todolistList/api/tasksApiTypes'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain } from 'features/todolistList/model/todolists/todolists-reducer'
import { FilterTasksButton } from 'features/todolistList/ui/todolist/FilterTasksButton/FilterTasksButton'
import { Tasks } from 'features/todolistList/ui/todolist/Tasks/Tasks'
import { TodolistTitle } from 'features/todolistList/ui/todolist/TodolistTitle/TodolistTitle'

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
