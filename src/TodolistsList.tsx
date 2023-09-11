import Grid from "@mui/material/Grid/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper/Paper";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolist-api";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    deleteTodolistTC, getTodolistTC,
    updateTodolistTitleTC
} from "./state/todolists-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./state/store";
import {Navigate} from "react-router-dom";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export const TodolistsList = () => {
    const state = useAppSelector<AppRootStateType>(state => state)

    const {tasks, todolists} = state
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, id, {title}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTitleTC(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTasks = tasks[tl.id]

                        return <Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}}>
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
                    })
                }
            </Grid></>

    )
}