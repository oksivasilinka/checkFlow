import { AxiosResponse } from 'axios'
import { BaseResponse, instance } from 'common'
import { AddTaskArgs, DeleteTaskArgs, GetTaskResponse, TaskResponse, UpdateTaskModel } from 'features'

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTasks(arg: AddTaskArgs) {
        return instance.post<
            BaseResponse<{ item: TaskResponse }>,
            AxiosResponse<BaseResponse<{ item: TaskResponse }>>,
            { title: string }
        >(`/todo-lists/${arg.id}/tasks`, { title: arg.title })
    },
    deleteTask(arg: DeleteTaskArgs) {
        return instance.delete<BaseResponse>(`todo-lists/${arg.todolistId}/tasks/${arg.id}`)
    },
    updateTask(todolistId: string, domainModel: UpdateTaskModel, id: string) {
        return instance.put<
            BaseResponse<{ item: TaskResponse }>,
            AxiosResponse<BaseResponse<{ item: TaskResponse }>>,
            UpdateTaskModel
        >(`todo-lists/${todolistId}/tasks/${id}`, domainModel)
    },
}
