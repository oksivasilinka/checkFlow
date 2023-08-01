import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})

export const todolistApi = {
    getTodo() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    addTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType[] }>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    addTasks(todolistId: string, title: string) {
        return instance.post<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, title: string, taskId: string) {
        return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{item: TaskType}>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


type TaskType = {
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

type UpdateTaskModelType = {
    id?: string
    title?: string
    description?: string
    todoListId?: string
    order?: number
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    addedDate?: string
}

type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

