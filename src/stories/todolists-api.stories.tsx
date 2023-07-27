import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.get()
        .then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'it-incubator'
    useEffect(() => {
      todolistApi.addTodo(title)
        .then((res)=> {
               setState(res.data)
           })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f101372e-c030-4d48-bb7d-284bb08225fb'
    useEffect(() => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '019be47b-29de-4ee1-a39a-8d56b9449279'
    const title = 'JS'
    useEffect(() => {
        todolistApi.updateTodo(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'c6a02fab-8d63-4509-9d50-f2390df61302'

    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then((res)=> {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const title = 'it-incubator'
    const todolistId = 'c6a02fab-8d63-4509-9d50-f2390df61302'
    useEffect(() => {
        todolistApi.addTasks(todolistId, title)
            .then((res)=> {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'c6a02fab-8d63-4509-9d50-f2390df61302'
    const id = '84fddb35-c555-4304-bdd8-1165807ad98e'
    useEffect(() => {
        todolistApi.deleteTask(todolistId, id)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '019be47b-29de-4ee1-a39a-8d56b9449279'
    const taskId = '451f6961-dfd3-464b-9f1e-fe09623e29e3'
    const title = 'JS'
    useEffect(() => {
        todolistApi.updateTask(todolistId, title, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}