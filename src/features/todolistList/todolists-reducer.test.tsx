import { TodolistDomain, todolistsActions, todolistsReducer } from 'features/todolistList/todolists-reducer'
import { v1 } from 'uuid'
import { FilterValues } from 'features/todolistList/TodolistsList'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomain>

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

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, todolistsActions.removeTodolist({ todolistId: todolistId1 }))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(
        startState,
        todolistsActions.addTodolist({
            todolist: {
                id: v1(),
                title: newTodolistTitle,
                filter: 'all',
            },
        }),
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
    expect(endState[2].id).toBeDefined()
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = todolistsActions.changeTodolistTitle({ todolistId: todolistId2, title: newTodolistTitle })

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValues = 'completed'

    const action = todolistsActions.changeTodolistFilter({ todolistId: todolistId2, filter: newFilter })
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
