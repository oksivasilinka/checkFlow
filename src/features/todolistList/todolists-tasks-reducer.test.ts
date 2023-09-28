import { TodolistDomain, todolistsReducer, todolistsThunks } from 'features/todolistList/todolists-reducer'
import { tasksReducer, TasksState } from 'features/todolistList/tasks-reducer'
import { v1 } from 'uuid'

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: Array<TodolistDomain> = []

    const action = todolistsThunks.addTodolists.fulfilled(
        {
            todolist: {
                id: v1(),
                title: 'new todolist',
                addedDate: '',
                order: 0,
            },
        },
        'requestId',
        { title: 'new todolist' },
    )
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
