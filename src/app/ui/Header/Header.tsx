import AppBar from '@mui/material/AppBar/AppBar'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import { Menu } from '@mui/icons-material'
import Typography from '@mui/material/Typography/Typography'
import Button from '@mui/material/Button/Button'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'
import { useAppSelector } from 'app/model/store'
import { selectStatus } from 'app/model/app.selectors'
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors'
import { useActions } from 'common/hooks/useActions'
import { authThunks } from 'features/auth/model/auth.slice'
import s from './header.module.css'
import { Link } from '@mui/material'

export const Header = () => {
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { logout } = useActions(authThunks)

    const logoutHandler = () => {
        logout()
    }

    return (
        <AppBar position="static">
            <Toolbar className={s.toolbar}>
                <Typography variant="h6">
                    <Link href={'/'} color={'inherit'} style={{ textDecoration: 'none' }}>
                        Check Flow
                    </Link>
                </Typography>

                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        LogOut
                    </Button>
                )}
                {!isLoggedIn && (
                    <Link href={'/login'} color={'inherit'} style={{ textDecoration: 'none' }}>
                        <Typography variant={'button'}>LogIn</Typography>
                    </Link>
                )}
            </Toolbar>
            {status === 'loading' && <LinearProgress />}
        </AppBar>
    )
}
