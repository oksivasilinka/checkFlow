import Container from '@mui/material/Container/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from 'features/TodolistList'
import { Login } from 'features/auth'
import React from 'react'
import s from 'app/ui/Routing/Routing.module.css'

export const Routing = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistsList />} />
                <Route path={'login'} element={<Login />} />
                <Route path={'404'} element={<h1 className={s.page404}>404: PAGE NOT FOUND</h1>} />
                <Route path={'*'} element={<Navigate to={'404'} />} />
            </Routes>
        </Container>
    )
}
