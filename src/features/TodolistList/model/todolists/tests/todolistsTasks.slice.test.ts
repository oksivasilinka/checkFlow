import { TodolistDomain, todolistsSlice, todolistsThunks, tasksSlice, TasksState } from 'features'

import { v1 } from 'uuid'

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: TodolistDomain[] = []

    const todolist = { id: v1(), title: 'new Todolist', addedDate: '', order: 0 }
    const action = todolistsThunks.addTodolist.fulfilled({ todolist }, 'requestId', { title: 'new Todolist' })

    const endTasksState = tasksSlice(startTasksState, action)
    const endTodolistsState = todolistsSlice(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
