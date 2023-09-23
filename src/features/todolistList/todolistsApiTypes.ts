export type TodolistApi = {
    addedDate: string
    id: string
    order: number
    title: string
}

export const ResultCode = {
    success: 0,
    error: 1,
    captcha: 10,
} as const

export type Error = {
    message: string
}

export type updateTodolistArgs = {
    todolistId: string
    title: string
}
