import type { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from 'common'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        value: 'value',
        callback: action('onChange'),
    },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {}
