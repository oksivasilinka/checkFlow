import { FormikHelpers, useFormik } from 'formik'
import { BaseResponse, useActions } from 'common'
import { authThunks } from 'features'

export const useLogin = () => {
    const { login } = useActions(authThunks)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: Error = {}
            const regs = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be more 3 symbols'
            }

            if (!values.email) {
                errors.email = 'Required'
            } else if (!regs.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<FormData>) => {
            login(values)
                .unwrap()
                .catch((err: BaseResponse) => {
                    err.fieldsErrors?.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })
    return { formik }
}

type Error = Partial<Omit<FormData, 'captcha' | 'rememberMe'>>

export type FormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
