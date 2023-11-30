import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { appActions, useAppDispatch, useAppSelector } from 'app'
import { selectError } from 'features'
import Typography from '@mui/material/Typography/Typography'
import { forwardRef, SyntheticEvent } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
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
