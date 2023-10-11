import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from 'common/components'
import { Todolist } from 'features/TodolistList/ui/Todolist'
import { todolistsThunks } from 'features/TodolistList/index'
import { useAppSelector } from 'app/model/store'
import { selectTodolists } from 'features/TodolistList/model/todolists/todolists.selectors'
import { selectTasks } from 'features/TodolistList/model/tasks/tasks.selectors'
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors'
import { useActions } from 'common/hooks/useActions'
import s from './TodolistsList.module.css'

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { getTodolists, addTodolist } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) return
        getTodolists()
    }, [])

    const addTodolistCallback = (title: string) => {
        return addTodolist({ title }).unwrap()
    }

    if (!isLoggedIn) {
        return <Navigate to={'login'} />
    }

    return (
        <>
            <Grid container className={s.addItemFormWrapper}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={3}>
                {todolists?.map((tl) => {
                    const allTasks = tasks[tl.id]

                    return (
                        <Grid key={tl.id} item>
                            <Paper className={s.todolistWrapper}>
                                <Todolist tasks={allTasks} todolist={tl} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
