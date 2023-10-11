import { AxiosResponse } from 'axios'
import { BaseResponse } from 'common/types'
import { instance } from 'common/api/api'
import { AuthMe } from 'features/auth/index'
import { FormData } from 'features/auth/lib/useLogin'

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
