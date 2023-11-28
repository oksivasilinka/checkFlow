import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { AddBox } from '@mui/icons-material'
import { BaseResponse } from 'common/types'
import Grid from '@mui/material/Grid/Grid'

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled }: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

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
        if (error) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <Grid container columns={12}>
            <Grid item xs={11}>
                <TextField
                    variant="outlined"
                    error={!!error}
                    value={title}
                    onChange={changeItemHandler}
                    onKeyDown={addItemOnKeyDown}
                    label="Title"
                    helperText={error}
                    disabled={disabled}
                    fullWidth={true}
                />
            </Grid>
            <Grid item xs={1} style={{ position: 'relative' }}>
                <IconButton
                    style={{ top: '8px', right: '-2px' }}
                    color="primary"
                    onClick={addItemHandler}
                    disabled={disabled}
                >
                    <AddBox />
                </IconButton>
            </Grid>
        </Grid>
    )
})
