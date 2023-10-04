import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { AddBox } from '@mui/icons-material'
import { BaseResponse } from 'common/types'

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm: FC<Props> = React.memo(({ addItem, disabled }) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
                .then(() => {
                    setTitle('')
                })
                .catch((err: BaseResponse) => {
                    if (err?.resultCode) {
                        setError(err.messages[0])
                    }
                })
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                variant="outlined"
                error={!!error}
                value={title}
                onChange={changeItemHandler}
                onKeyDown={addItemOnKeyDown}
                label="Title"
                helperText={error}
                disabled={disabled}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                <AddBox />
            </IconButton>
        </div>
    )
})