import axios, { AxiosResponse } from 'axios'
import { FormType } from 'features/login/Login'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

export const todolistApi = {
    getTodo() {
        return instance.get<TodolistApi[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<
            Response<{ item: TodolistApi }>,
            AxiosResponse<Response<{ item: TodolistApi }>>,
            { title: string }
        >('todo-lists', { title })
    },
    deleteTodo(todolistId: string) {
        return instance.delete<Response>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<Response, AxiosResponse<Response>, { title: string }>(`todo-lists/${todolistId}`, {
            title,
        })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTasks(arg: AddTaskArgs) {
        return instance.post<
            Response<{ item: TaskType }>,
            AxiosResponse<Response<{ item: TaskType }>>,
            { title: string }
        >(`/todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
    },
    deleteTask(arg: DeleteTaskArgs) {
        return instance.delete<Response>(`todo-lists/${arg.todolistId}/tasks/${arg.id}`)
    },
    updateTask(todolistId: string, domainModel: UpdateTaskModel, id: string) {
        return instance.put<Response<{ item: TaskType }>, AxiosResponse<Response<{ item: TaskType }>>, UpdateTaskModel>(
            `todo-lists/${todolistId}/tasks/${id}`,
            domainModel,
        )
    },
}

export const authApi = {
    me() {
        return instance.get<Response<AuthMe>>('auth/me')
    },
    login(data: FormType) {
        return instance.post<null, AxiosResponse<Response<{ userId: number }>>, FormType>('auth/login', data)
    },
    logout() {
        return instance.delete<Response>(`/auth/login`)
    },
}
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
    domainModel: UpdateDomainTaskModel
    id: string
}

type AuthMe = {
    id: number
    email: string
    login: string
}

type TodolistApi = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type Response<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
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

export type UpdateTaskModel = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type UpdateDomainTaskModel = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type GetTaskResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export enum RESULT_CODES {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10,
}

export type Error = {
    message: string
}
