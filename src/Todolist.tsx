import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistTd: string, taskId: string, updateTitle: string) => void
    updateTodolist: (todolistTd: string, updateTitle: string) => void

}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const updateTaskHandler = (tId: string, updateTitle: string) => {
        props.updateTask(props.todolistId, tId, updateTitle)
    }

    const updateTodoHandler = (updateTitle: string) => {
        props.updateTodolist(props.todolistId, updateTitle)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodoHandler}/>
            {/*<button onClick={removeTodolistHandler}>x</button>*/}

            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>

        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}


                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone} />


                        <EditableSpan oldTitle={t.title} callBack={(updateTitle) => {
                            updateTaskHandler(t.id, updateTitle)
                        }}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="primary"
                    onClick={onAllClickHandler}> All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success"
                    onClick={onActiveClickHandler}> Active
            </Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={onCompletedClickHandler}> Completed
            </Button>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}onClick={onCompletedClickHandler}>Completed</button>*/}

        </div>
    </div>
}

