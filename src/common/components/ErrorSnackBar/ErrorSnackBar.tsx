import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from 'app/model/store'
import { appActions } from 'app/model/app.slice'
import { selectError } from 'features/auth/model/auth.selectors'
import Typography from '@mui/material/Typography/Typography'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appActions.setError({ error: null }))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                <Typography variant={'body1'}>{error} 😠</Typography>
            </Alert>
        </Snackbar>
    )
}
