import type { Meta, StoryObj } from '@storybook/react'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField/TextField'
import IconButton from '@mui/material/IconButton/IconButton'
import { AddBox } from '@mui/icons-material'
import { AddItemForm, BaseResponse } from 'common'
import s from 'common/components/AddItemForm/AddItemForm.module.css'

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked',
        },
    },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {}

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
    label: string
}

const AddItemFormError = (args: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')

    const addItemHandler = () => {
        if (title.trim() !== '') {
            args.addItem(title)
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
        <div className={s.textField}>
            <TextField
                size={'small'}
                variant="outlined"
                error={!!error}
                value={title}
                onChange={changeItemHandler}
                onKeyDown={addItemOnKeyDown}
                label={args.label}
                helperText={error}
                disabled={args.disabled}
                fullWidth={true}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={args.disabled}>
                <AddBox />
            </IconButton>
        </div>
    )
}

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addItem={args.addItem} label={'Add task'} />,
}
