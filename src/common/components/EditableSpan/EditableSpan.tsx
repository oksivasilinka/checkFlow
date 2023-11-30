import { ChangeEvent, memo, useState } from 'react'
import TextField from '@mui/material/TextField'

export type Props = {
    value: string
    callback: (newValue: string) => void
}

export const EditableSpan = memo(({ value, callback }: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        callback(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ? (
        <TextField variant="outlined" value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
    ) : (
        <span
            style={{ display: 'grid', wordBreak: 'break-all', alignContent: 'center' }}
            onDoubleClick={activateEditMode}
        >
            {value}
        </span>
    )
})
