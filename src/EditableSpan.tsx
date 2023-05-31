import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    oldTitle: string
    callBack: (updateTitle: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)

    const editFoo = () => {
        setEdit(!edit)
        if (edit) {
            addTaskHandler()
        }
    }

    let [updateTitle, setUpdateTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.callBack(updateTitle)
    }

    return (
        edit
        ? <input
                value={updateTitle}
                onChange={onChangeHandler}
                onBlur={editFoo}
                autoFocus/>
        : <span onDoubleClick={editFoo}>{props.oldTitle}</span>
    )
}