import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AddItemForm, useActions } from 'common'
import { Todolist, todolistsThunks, selectTodolists, selectIsLoggedIn, selectTasks } from 'features'
import { useAppSelector } from 'app'
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
                <AddItemForm addItem={addTodolistCallback} label={'Enter the name of the list'} />
            </Grid>
            <Grid container spacing={3}>
                {todolists?.map((tl) => {
                    const allTasks = tasks[tl.id]

                    return (
                        <Grid key={tl.id} item>
                            <Paper elevation={4} className={s.todolistWrapper}>
                                <Todolist tasks={allTasks} todolist={tl} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
