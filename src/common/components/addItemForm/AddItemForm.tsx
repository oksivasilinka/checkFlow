import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import { AddBox } from '@mui/icons-material'
import { BaseResponse } from 'common/types'

export type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props
                .addItem(title)
                .then(() => {
                    setTitle('')
                })
                .catch((err: BaseResponse) => {
                    setError(err.messages[0])
                })
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant="outlined"
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                label="Title"
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
                <AddBox />
            </IconButton>
        </div>
    )
})
