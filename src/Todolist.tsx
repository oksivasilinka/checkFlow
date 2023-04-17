import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    changeTaskStatus: (tasksId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodolistPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const tasksListItem: Array<JSX.Element> = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        const taskClasses = t.isDone ? 'task-isDone' : 'task'
        return (
            <li>
                <div>
                    <input type="checkbox" checked={t.isDone}
                           onChange={changeStatus}/>
                    <span className={taskClasses}>{t.title}</span>
                </div>

                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isBTNDisabled: boolean = !title.length || title.length > titleMaxLength

    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "crimson"}}>Title is too long</div>
        : null
    const userMessage = error
        ? <div style={{color: "crimson"}}>Title is required</div>
        : null

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isBTNDisabled && addTaskHandler()
    const inputClasses = error || isTitleLengthTooLong ? 'input-error' : undefined


    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"please, enter title"}
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPress}
                    className={inputClasses}
                />
                <button
                    disabled={isBTNDisabled}
                    onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksListItem}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <button className={props.filter === 'all' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                        onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;