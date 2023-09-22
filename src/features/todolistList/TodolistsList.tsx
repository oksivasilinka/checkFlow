import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import { Todolist } from 'features/todolistList/todolist/Todolist'
import React, { useCallback, useEffect } from 'react'
import { addTasks, deleteTasks, tasksThunks } from 'features/todolistList/tasks-reducer'
import {
    addTodolistTC,
    deleteTodolistTC,
    getTodolistTC,
    todolistsActions,
    updateTodolistTitleTC,
} from 'features/todolistList/todolists-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn, selectTasks, selectTodolists } from 'app/appSelectors'
import { AddItemForm } from 'common/components'
import { TaskStatuses } from 'common/enums'

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

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback(
        (id: string, todolistId: string) => {
            dispatch(deleteTasks({ todolistId, id }))
        },
        [dispatch],
    )

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTasks({ todolistId, title }))
        },
        [dispatch],
    )

    const changeStatus = useCallback(
        (id: string, status: TaskStatuses, todolistId: string) => {
            dispatch(tasksThunks.updateTask({ todolistId, domainModel: { status }, id }))
        },
        [dispatch],
    )

    const changeTaskTitle = useCallback(
        (id: string, title: string, todolistId: string) => {
            dispatch(tasksThunks.updateTask({ todolistId, domainModel: { title }, id }))
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
        (id: string) => {
            dispatch(deleteTodolistTC(id))
        },
        [dispatch],
    )

    const changeTodolistTitle = useCallback(
        (id: string, title: string) => {
            dispatch(updateTodolistTitleTC(id, title))
        },
        [dispatch],
    )

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodolistTC(title))
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
