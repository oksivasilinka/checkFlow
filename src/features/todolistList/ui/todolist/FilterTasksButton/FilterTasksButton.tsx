import React, { FC } from 'react'
import Button from '@mui/material/Button'
import { useActions } from 'common/hooks/useActions'
import { FilterValues, TodolistDomain, todolistsActions } from 'features/todolistList/model/todolists/todolists-reducer'

type Props = {
    todolist: TodolistDomain
}

export const FilterTasksButton: FC<Props> = ({ todolist }) => {
    const { changeTodolistFilter } = useActions(todolistsActions)

    const changeTodolistFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter({ todolistId: todolist.id, filter })
    }

    return (
        <>
            <Button
                title={'All'}
                color={'inherit'}
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('all')}
            >
                All
            </Button>
            <Button
                title={'Active'}
                color={'primary'}
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('active')}
            >
                Active
            </Button>
            <Button
                color={'secondary'}
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('completed')}
            >
                Completed
            </Button>
        </>
    )
}
