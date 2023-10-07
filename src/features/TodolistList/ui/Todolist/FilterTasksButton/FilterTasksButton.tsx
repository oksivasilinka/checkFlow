import React from 'react'
import Button from '@mui/material/Button'
import { useActions } from 'common/hooks/useActions'
import { FilterValues, TodolistDomain, todolistsActions } from 'features/TodolistList/model/todolists/todolists.slice'

type Props = {
    todolist: TodolistDomain
}

export const FilterTasksButton = ({ todolist }: Props) => {
    const { changeTodolistFilter } = useActions(todolistsActions)
    const { id, filter } = todolist

    const changeTodolistFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter({ id, filter })
    }

    return (
        <>
            <Button
                title={'All'}
                color={'inherit'}
                variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('all')}
            >
                All
            </Button>
            <Button
                title={'Active'}
                color={'primary'}
                variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('active')}
            >
                Active
            </Button>
            <Button
                color={'secondary'}
                variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('completed')}
            >
                Completed
            </Button>
        </>
    )
}
