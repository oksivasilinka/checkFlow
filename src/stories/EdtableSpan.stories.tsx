import type { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from 'EditableSpan'

// создаем компоненту
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        value: 'value',
        // onChange: action('onChange')
    },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpnStory: Story = {}
