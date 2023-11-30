import Button from '@mui/material/Button'
import { useActions } from 'common'
import { FilterValues, TodolistDomain, todolistsActions } from 'features'
import s from './FilterTasksButton.module.css'

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
        <div className={s.buttonWrapper}>
            <Button
                className={s.button}
                title={'All'}
                color={'primary'}
                variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilterHandler('all')}
            >
                All
            </Button>
            <Button
                title={'Active'}
                color={'primary'}
                variant={filter === 'active' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilterHandler('active')}
            >
                Active
            </Button>
            <Button
                color={'primary'}
                variant={filter === 'completed' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilterHandler('completed')}
            >
                Completed
            </Button>
        </div>
    )
}
