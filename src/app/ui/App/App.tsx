import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { authThunks } from 'features'
import { ErrorSnackbar, useActions } from 'common'
import { Header, Routing, selectIsInitialized, useAppSelector } from 'app'
import s from './App.module.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles'

export const App = () => {
    const isInitialized = useAppSelector(selectIsInitialized)
    const { me } = useActions(authThunks)

    useEffect(() => {
        me()
    }, [])

    if (!isInitialized) {
        return (
            <div className={s.CircularProgress}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routing />
            <ErrorSnackbar />
        </ThemeProvider>
    )
}
