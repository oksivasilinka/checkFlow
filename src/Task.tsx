import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = memo(({
                         task,
                         changeTaskStatus,
                         changeTaskTitle,
                         removeTask
                     }: TaskPropsType) => {


    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle])


    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})