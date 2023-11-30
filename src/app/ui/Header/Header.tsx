import AppBar from '@mui/material/AppBar/AppBar'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import Typography from '@mui/material/Typography/Typography'
import Button from '@mui/material/Button/Button'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppSelector, selectStatus } from 'app'
import { selectIsLoggedIn, authThunks } from 'features'
import { useActions } from 'common'
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
