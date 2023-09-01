import React, {useEffect} from 'react';
import './App.css';
import AppBar from "@mui/material/AppBar/AppBar";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "./ErrorSnackBar";
import {Login} from "./features/login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "./TodolistsList";
import {useAppDispatch, useAppSelector} from "./state/store";
import {RequestStatusType} from "./state/app-reducer";
import {meTC} from "./state/login-reducer";


function App() {
    let status = useAppSelector<RequestStatusType>(state => state.app.status)
    let dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(meTC())
    },[])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>

            <Container fixed>

                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>

            </Container>

            <ErrorSnackbar/>
        </div>

    );
}

export default App;
