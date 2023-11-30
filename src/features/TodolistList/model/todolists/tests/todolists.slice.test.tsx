import { FilterValues, TodolistDomain, todolistsActions, todolistsSlice, todolistsThunks } from 'features'
import { v1 } from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomain[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            entityStatus: 'idle',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            entityStatus: 'idle',
        },
    ]
})

test('correct Todolist should be removed', () => {
    const endState = todolistsSlice(
        startState,
        todolistsThunks.removeTodolist.fulfilled({ id: todolistId1 }, 'requestId', { id: todolistId1 }),
    )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct Todolist should be added', () => {
    const newTitle = 'New Todolist'
    const todolist = { id: v1(), title: newTitle, addedDate: '', order: 0 }

    const endState = todolistsSlice(
        startState,
        todolistsThunks.addTodolist.fulfilled({ todolist }, 'requestId', { title: newTitle }),
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[2].filter).toBe('all')
    expect(endState[2].id).toBeDefined()
})

test('correct Todolist should change its name', () => {
    const newTitle = 'New Todolist'
    const args = { id: todolistId2, title: newTitle }

    const action = todolistsThunks.updateTodolistTitle.fulfilled(args, 'requestId', args)
    const endState = todolistsSlice(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of Todolist should be changed', () => {
    const newFilter: FilterValues = 'completed'

    const action = todolistsActions.changeTodolistFilter({ id: todolistId2, filter: newFilter })
    const endState = todolistsSlice(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
