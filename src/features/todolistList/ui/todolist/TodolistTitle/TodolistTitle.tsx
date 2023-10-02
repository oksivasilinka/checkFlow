import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import React, { FC } from 'react'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain, todolistsThunks } from 'features/todolistList/model/todolists/todolists-reducer'

type Props = {
    todolist: TodolistDomain
}

export const TodolistTitle: FC<Props> = ({ todolist }) => {
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsThunks)
    const { id, entityStatus, title } = todolist

    const removeTodolistHandler = () => {
        removeTodolist({ id })
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle({ id, title })
    }

    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </h3>
    )
}
