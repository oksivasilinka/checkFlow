import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import React from 'react'
import { useActions } from 'common/hooks/useActions'
import { TodolistDomain, todolistsThunks } from 'features/TodolistList/model/todolists/todolists.slice'

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
        <h3>
            <EditableSpan value={title} callback={changeTodolistTitleHandler} />
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </h3>
    )
}
