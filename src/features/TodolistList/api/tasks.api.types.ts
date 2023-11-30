import { TaskPriorities, TaskStatuses } from 'common'

export type AddTaskArgs = {
    id: string
    title: string
}

export type DeleteTaskArgs = {
    todolistId: string
    id: string
}

export type UpdateTaskArgs = {
    todolistId: string
    model: UpdateDomainTaskModel
    id: string
}

export type TaskResponse = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type UpdateTaskModel = Omit<TaskResponse, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type UpdateDomainTaskModel = Partial<UpdateTaskModel>

export type GetTaskResponse = {
    items: TaskResponse[]
    totalCount: number
    error: string | null
}
