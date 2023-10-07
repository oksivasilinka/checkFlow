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

export type updateTodolistArgs = Omit<TodolistApi, 'addedDate' | 'order'>
