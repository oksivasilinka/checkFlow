import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import React, { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { Todolist } from 'features/todolistList/todolist'
import { todolistsActions, todolistsThunks, tasksThunks } from 'features/todolistList'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectTodolists } from 'features/todolistList/todolistsSelectors'
import { selectTasks } from 'features/todolistList/tasksSelectors'
import { selectIsLoggedIn } from 'features/auth/authSelectors'
import { useActions } from 'common/hooks/useActions'

export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const { fetchTodolists, removeTodolists, addTodolists, updateTodolistTitle } = useActions(todolistsThunks)
    const { deleteTasks, addTasks, updateTask } = useActions(tasksThunks)

    useEffect(() => {
        if (!isLoggedIn) return
        fetchTodolists()
    }, [])

    const removeTask = useCallback(
        (id: string, todolistId: string) => {
            deleteTasks({ todolistId, id })
        },
        [dispatch],
    )

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            addTasks({ todolistId, title })
        },
        [dispatch],
    )

    const changeStatus = useCallback(
        (id: string, status: TaskStatuses, todolistId: string) => {
            updateTask({ todolistId, model: { status }, id })
        },
        [dispatch],
    )

    const changeTaskTitle = useCallback(
        (id: string, title: string, todolistId: string) => {
            updateTask({ todolistId, model: { title }, id })
        },
        [dispatch],
    )

    const changeFilter = useCallback(
        (filter: FilterValues, todolistId: string) => {
            dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
        },
        [dispatch],
    )

    const removeTodolist = useCallback(
        (todolistId: string) => {
            removeTodolists({ todolistId })
        },
        [dispatch],
    )

    const changeTodolistTitle = useCallback(
        (todolistId: string, title: string) => {
            updateTodolistTitle({ todolistId, title })
        },
        [dispatch],
    )

    const addTodolist = useCallback(
        (title: string) => {
            addTodolists({ title })
        },
        [dispatch],
    )

    if (!isLoggedIn) {
        return <Navigate to={'login'} />
    }

    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {todolists?.map((tl) => {
                    let allTasks = tasks[tl.id]

                    return (
                        <Grid key={tl.id} item>
                            <Paper style={{ padding: '10px' }}>
                                <Todolist
                                    id={tl.id}
                                    entityStatus={tl.entityStatus}
                                    title={tl.title}
                                    tasks={allTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
