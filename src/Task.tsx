import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppSelector} from "./state/store";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = memo(({
                              task,
                              changeTaskStatus,
                              changeTaskTitle,
                              removeTask
                          }: TaskPropsType) => {
    const status = useAppSelector(state => state.app.status)


    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle])


    return (
        <div key={task.id} className={task.status ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} disabled={status === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
    )
})