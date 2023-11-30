import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { ChangeEvent, memo } from 'react'
import { useAppSelector } from 'app'
import { EditableSpan, TaskStatuses, useActions } from 'common'
import { TaskResponse, tasksThunks } from 'features'
import s from './Task.module.css'

type Props = {
    task: TaskResponse
}

export const Task = memo(({ task }: Props) => {
    const status = useAppSelector((state) => state.app.status)
    const { deleteTask, updateTask } = useActions(tasksThunks)
    const { id, title } = task

    const deleteTaskHandler = () => {
        deleteTask({ id, todolistId: task.todoListId })
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ todolistId: task.todoListId, model: { status }, id })
    }

    const changeTitleHandler = (title: string) => {
        updateTask({ todolistId: task.todoListId, model: { title }, id })
    }

    return (
        <div key={task.id} className={task.status ? `${s.wrapper} ${s.isDone} ` : `${s.wrapper}`}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

            <EditableSpan value={title} callback={changeTitleHandler} />
            <IconButton onClick={deleteTaskHandler} disabled={status === 'loading'}>
                <Delete />
            </IconButton>
        </div>
    )
})
