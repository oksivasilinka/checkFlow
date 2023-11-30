import { useEffect, useState } from 'react'
import { tasksApi, todolistsApi } from 'features'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodo().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'it-incubator'
    useEffect(() => {
        todolistsApi.addTodo(title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f101372e-c030-4d48-bb7d-284bb08225fb'
    useEffect(() => {
        todolistsApi.deleteTodo(todolistId).then((res) => {
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
        todolistsApi.updateTodo(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'c6a02fab-8d63-4509-9d50-f2390df61302'

    useEffect(() => {
        tasksApi.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const title = 'it-incubator'
    const id = 'c6a02fab-8d63-4509-9d50-f2390df61302'
    useEffect(() => {
        tasksApi.addTasks({ id, title }).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'c6a02fab-8d63-4509-9d50-f2390df61302'
    const id = 'c1083b25-4b5b-4db6-b24b-92d92dca4ee5'
    useEffect(() => {
        tasksApi.deleteTask({ todolistId, id }).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
