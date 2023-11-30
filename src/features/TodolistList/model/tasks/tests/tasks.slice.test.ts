import { v1 } from 'uuid'
import { todolistsThunks, tasksSlice, TasksState, tasksThunks } from 'features'
import { TaskPriorities, TaskStatuses } from 'common'

let startState: TasksState

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '2',
                title: 'JS',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '3',
                title: 'React',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '2',
                title: 'milk',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: '3',
                title: 'tea',
                description: '',
                todoListId: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
    }
})

test('correct Task should be deleted from correct array', () => {
    const args = { id: '2', todolistId: 'todolistId2' }
    const action = tasksThunks.deleteTask.fulfilled(args, 'requestId', args)
    const endState = tasksSlice(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
    expect(endState['todolistId2'][1].id).toBe('3')
})

test('correct Task should be added to correct array', () => {
    const task = {
        id: '3',
        title: 'juce',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        addedDate: '',
    }
    const action = tasksThunks.addTask.fulfilled({ task }, 'requestId', {
        id: task.todoListId,
        title: task.title,
    })
    const endState = tasksSlice(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified Task should be changed', () => {
    const model = { id: '2', model: { status: TaskStatuses.New }, todolistId: 'todolistId2' }
    const action = tasksThunks.updateTask.fulfilled(model, 'requestId', model)

    const endState = tasksSlice(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy()
    expect(endState['todolistId1'][1].status).toBeTruthy()
})

test('title of specified Task should be changed', () => {
    const model = { id: '2', model: { title: 'Milkyway' }, todolistId: 'todolistId2' }
    const action = tasksThunks.updateTask.fulfilled(model, 'requestId', model)
    const endState = tasksSlice(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkyway')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new property with new array should be added when new Todolist is added', () => {
    const todolist = { id: v1(), title: 'title no matter', addedDate: '', order: 0 }
    const action = todolistsThunks.addTodolist.fulfilled({ todolist }, 'requestId', { title: todolist.title })
    const endState = tasksSlice(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) throw Error('new key should be added')

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('propertry with todolistId should be deleted', () => {
    const args = { id: 'todolistId2' }
    const action = todolistsThunks.removeTodolist.fulfilled(args, 'requestId', args)
    const endState = tasksSlice(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
