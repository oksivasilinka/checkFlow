import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})


export const todolistApi = {
    get() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    addTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType[] }>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    addTasks(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/${taskId}`)
    },
    updateTask(todolistId: string, title: string, taskId: string) {
        return instance.put(`todo-lists/${todolistId}/${taskId}`, {title})
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


