import { AxiosResponse } from 'axios'
import { BaseResponse } from 'common/types'
import {
    AddTaskArgs,
    DeleteTaskArgs,
    GetTaskResponse,
    TaskType,
    UpdateTaskModel,
} from 'features/todolistList/tasksApiTypes'
import { instance } from 'common/api/api'

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTasks(arg: AddTaskArgs) {
        return instance.post<
            BaseResponse<{ item: TaskType }>,
            AxiosResponse<BaseResponse<{ item: TaskType }>>,
            { title: string }
        >(`/todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
    },
    deleteTask(arg: DeleteTaskArgs) {
        return instance.delete<BaseResponse>(`todo-lists/${arg.todolistId}/tasks/${arg.id}`)
    },
    updateTask(todolistId: string, domainModel: UpdateTaskModel, id: string) {
        return instance.put<
            BaseResponse<{ item: TaskType }>,
            AxiosResponse<BaseResponse<{ item: TaskType }>>,
            UpdateTaskModel
        >(`todo-lists/${todolistId}/tasks/${id}`, domainModel)
    },
}
