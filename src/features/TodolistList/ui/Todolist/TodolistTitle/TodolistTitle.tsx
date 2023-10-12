import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import React from 'react'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain, todolistsThunks } from 'features/TodolistList/model/todolists/todolists.slice'
import s from './TodolistTitle.module.css'
import Typography from '@mui/material/Typography/Typography'

type Props = {
    todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsThunks)
    const { id, entityStatus, title } = todolist

    const removeTodolistHandler = () => {
        removeTodolist({ id })
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle({ id, title })
    }

    return (
        <Typography variant={'h6'} className={s.titleBlock}>
            <div className={s.title}>
                <EditableSpan value={title} callback={changeTodolistTitleHandler} />
            </div>
            <IconButton className={s.iconDelete} onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </Typography>
    )
}
