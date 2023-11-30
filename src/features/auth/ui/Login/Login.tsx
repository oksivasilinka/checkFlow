import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useAppSelector } from 'app'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn, useLogin } from 'features'
import s from './Login.module.css'
import Typography from '@mui/material/Typography/Typography'

export const Login = () => {
    const { formik } = useLogin()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div className={s.wrapper}>
            <FormControl className={s.formWrapper}>
                <FormLabel className={s.label}>
                    <Typography variant={'h6'}>
                        Enter your email and password. If you don't have an account yet, register{' '}
                        <a
                            href={'https://social-network.samuraijs.com/'}
                            style={{ color: '#e91e63' }}
                            target={'_blank'}
                        >
                            here
                        </a>
                    </Typography>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup className={s.form}>
                        <div className={s.input}>
                            <TextField label="Email" fullWidth size={'small'} {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email && (
                                <span className={s.errorMessage}>{formik.errors.email}</span>
                            )}
                        </div>

                        <div className={s.input}>
                            <TextField
                                fullWidth
                                size={'small'}
                                type="password"
                                label="Password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span className={s.errorMessage}>{formik.errors.password}</span>
                            )}
                        </div>

                        <FormControlLabel
                            className={s.checkbox}
                            label={'Remember me'}
                            control={
                                <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />
                            }
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </div>
    )
}
