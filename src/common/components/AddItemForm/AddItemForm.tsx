import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import { AddBox } from '@mui/icons-material'
import { BaseResponse } from 'common'
import s from './AddItemForm.module.css'

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
    label: string
}

export const AddItemForm = memo(({ addItem, disabled, label }: Props) => {
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
        <div className={s.textField}>
            <TextField
                size={'small'}
                variant="outlined"
                error={!!error}
                value={title}
                onChange={changeItemHandler}
                onKeyDown={addItemOnKeyDown}
                label={label}
                helperText={error}
                disabled={disabled}
                fullWidth={true}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                <AddBox />
            </IconButton>
        </div>
    )
})
