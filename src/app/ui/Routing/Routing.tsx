import Container from '@mui/material/Container/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import s from './Routing.module.css'
import { Login, TodolistsList } from 'features'

export const Routing = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistsList />} />
                <Route path={'login'} element={<Login />} />
                <Route path={'*'} element={<Navigate to={'404'} />} />
                <Route path={'404'} element={<h1 className={s.page404}>404: PAGE NOT FOUND</h1>} />
            </Routes>
        </Container>
    )
}
