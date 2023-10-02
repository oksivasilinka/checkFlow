import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { authThunks } from 'features/auth/model/authSlice'
import { ErrorSnackbar } from 'common/components'
import { useAppSelector } from 'app/model/store'
import { selectIsInitialized } from 'app/model/appSelectors'
import { useActions } from 'common/hooks/useActions'
import { Header } from 'app/ui/Header/Header'
import { Routing } from 'app/ui/Routing/Routing'
import s from 'app/ui/App/App.module.css'

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
        <div>
            <Header />
            <Routing />
            <ErrorSnackbar />
        </div>
    )
}

export default App
