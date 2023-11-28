import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { authThunks } from 'features/auth/model/auth.slice'
import { ErrorSnackbar } from 'common/components'
import { useAppSelector } from 'app/model/store'
import { selectIsInitialized } from 'app/model/app.selectors'
import { useActions } from 'common/hooks/useActions'
import { Header } from 'app/ui/Header/Header'
import { Routing } from 'app/ui/Routing/Routing'
import s from 'app/ui/App/App.module.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles/theme'

function App() {
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

export default App
