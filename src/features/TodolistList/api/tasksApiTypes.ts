import { TaskPriorities, TaskStatuses } from 'common/enums'

export type AddTaskArgs = {
    todolistId: string
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

export type TaskType = {
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
export type UpdateTaskModel = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type UpdateDomainTaskModel = Partial<UpdateTaskModel>

export type GetTaskResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
