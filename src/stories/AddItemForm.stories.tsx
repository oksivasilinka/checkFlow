import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm, AddItemFormPropsType } from 'AddItemForm'
import { action } from '@storybook/addon-actions'
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField/TextField'
import IconButton from '@mui/material/IconButton/IconButton'
import { AddBox } from '@mui/icons-material'

// создаем компоненту
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            // action: 'clicked'
        },
    },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

//создаем стори
export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form'),
    },
}

const AddItemFormError: FC<AddItemFormPropsType> = (args) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>('Title is required')

    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title)
            setTitle('')
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
            />
            <IconButton color="primary" onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>
    )
}

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addItem={args.addItem} />,
}
