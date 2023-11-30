import { AxiosResponse } from 'axios'
import { BaseResponse, instance } from 'common'
import { AuthMe, FormData } from 'features'

export const authApi = {
    me() {
        return instance.get<BaseResponse<AuthMe>>('auth/me')
    },
    login(data: FormData) {
        return instance.post<null, AxiosResponse<BaseResponse<{ userId: number }>>, FormData>('auth/login', data)
    },
    logout() {
        return instance.delete<BaseResponse>(`/auth/login`)
    },
}
