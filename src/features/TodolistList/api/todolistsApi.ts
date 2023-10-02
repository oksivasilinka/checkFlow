import { AxiosResponse } from 'axios'
import { BaseResponse } from 'common/types'
import { instance } from 'common/api/api'
import { TodolistApi } from 'features/TodolistList/api/todolistsApiTypes'

export const todolistsApi = {
    getTodo() {
        return instance.get<TodolistApi[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<
            BaseResponse<{ item: TodolistApi }>,
            AxiosResponse<BaseResponse<{ item: TodolistApi }>>,
            { title: string }
        >('todo-lists', { title })
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<BaseResponse, AxiosResponse<BaseResponse>, { title: string }>(`todo-lists/${todolistId}`, {
            title,
        })
    },
}
