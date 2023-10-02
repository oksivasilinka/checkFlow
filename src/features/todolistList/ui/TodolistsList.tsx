import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from 'common/components'
import { Todolist } from 'features/todolistList/ui/todolist'
import { todolistsThunks } from 'features/todolistList/index'
import { useAppSelector } from 'app/store'
import { selectTodolists } from 'features/todolistList/model/todolists/todolistsSelectors'
import { selectTasks } from 'features/todolistList/model/tasks/tasksSelectors'
import { selectIsLoggedIn } from 'features/auth/model/authSelectors'
import { useActions } from 'common/hooks/useActions'

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { fetchTodolists, addTodolist } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) return
        fetchTodolists()
    }, [])

    const addTodolistCallback = (title: string) => {
        return addTodolist({ title }).unwrap()
    }

    if (!isLoggedIn) return <Navigate to={'login'} />

    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={3}>
                {todolists?.map((tl) => {
                    let allTasks = tasks[tl.id]

                    return (
                        <Grid key={tl.id} item>
                            <Paper style={{ padding: '10px' }}>
                                <Todolist todolistId={tl.id} tasks={allTasks} todolist={tl} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
