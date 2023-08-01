import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, ButtonProps} from "@mui/material";
import {Task} from "./Task";
import {getTaskTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id])

    let tasks = props.tasks

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.id, props.removeTask])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.id);
    }, [props.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.id, props.changeTaskTitle])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}/>
                })
            }
        </div>
        <div>
            <ButtonWithMemo
                title={'All'}
                color={'inherit'}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
            />
            <ButtonWithMemo
                title={'Active'}
                color={'primary'}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
            />
            <ButtonWithMemo
                title={'Completed'}
                color={'secondary'}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
            />
        </div>
    </div>
})

// type ButtonWithMemoPropsType = {
//     title: string
//     color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
//     variant: 'text' | 'outlined' | 'contained'
//     onClick: () => void
// }

const ButtonWithMemo = memo((props: ButtonProps) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}
    </Button>
})
