import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import React, { ChangeEvent, FC } from 'react'
import { useAppSelector } from 'app/store'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { TaskType } from 'features/todolistList/api/tasksApiTypes'
import { useActions } from 'common/hooks/useActions'
import { tasksThunks } from 'features/todolistList/model/tasks/tasks-reducer'
import s from 'features/todolistList/ui/todolist/Tasks/Task/Task.module.css'

type Props = {
    task: TaskType
}

export const Task: FC<Props> = React.memo(({ task }) => {
    const status = useAppSelector((state) => state.app.status)
    const { deleteTask, updateTask } = useActions(tasksThunks)

    const deleteTaskHandler = () => {
        deleteTask({ id: task.id, todolistId: task.todoListId })
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ todolistId: task.todoListId, model: { status: status }, id: task.id })
    }

    const changeTitleHandler = (title: string) => {
        updateTask({ todolistId: task.todoListId, model: { title }, id: task.id })
    }

    return (
        <div key={task.id} className={task.status ? s.isDone : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

            <EditableSpan value={task.title} onChange={changeTitleHandler} />
            <IconButton onClick={deleteTaskHandler} disabled={status === 'loading'}>
                <Delete />
            </IconButton>
        </div>
    )
})
