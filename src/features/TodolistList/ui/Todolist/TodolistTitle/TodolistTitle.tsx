import { EditableSpan, useActions } from 'common'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { TodolistDomain, todolistsThunks } from 'features'
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
        <Typography variant={'h6'} className={s.titleBlock} color={'primary'}>
            <EditableSpan value={title} callback={changeTodolistTitleHandler} />
            <IconButton className={s.iconDelete} onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </Typography>
    )
}
