import { TodolistDomain, todolistsSlice, todolistsThunks } from 'features/TodolistList/model/todolists/todolistsSlice'
import { tasksSlice, TasksState } from 'features/TodolistList/model/tasks/tasksSlice'
import { v1 } from 'uuid'

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: Array<TodolistDomain> = []

    const action = todolistsThunks.addTodolist.fulfilled(
        {
            todolist: {
                id: v1(),
                title: 'new Todolist',
                addedDate: '',
                order: 0,
            },
        },
        'requestId',
        { title: 'new Todolist' },
    )
    const endTasksState = tasksSlice(startTasksState, action)
    const endTodolistsState = todolistsSlice(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
