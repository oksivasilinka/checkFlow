import { AxiosResponse } from 'axios'
import { FormType } from 'features/auth'
import { BaseResponse } from 'common/types'
import { instance } from 'common/api/api'
import { AuthMe } from 'features/auth'

export const authApi = {
    me() {
        return instance.get<BaseResponse<AuthMe>>('auth/me')
    },
    login(data: FormType) {
        return instance.post<null, AxiosResponse<BaseResponse<{ userId: number }>>, FormType>('auth/login', data)
    },
    logout() {
        return instance.delete<BaseResponse>(`/auth/login`)
    },
}
