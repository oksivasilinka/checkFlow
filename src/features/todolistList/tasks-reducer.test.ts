import { tasksReducer, TasksState, tasksThunks } from 'features/todolistList/tasks-reducer'
import { v1 } from 'uuid'
import { todolistsActions } from 'features/todolistList/todolists-reducer'
import { TaskPriorities, TaskStatuses } from 'common/enums'

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

test('correct task should be deleted from correct array', () => {
    const action = tasksThunks.deleteTasks.fulfilled({ id: '2', todolistId: 'todolistId2' }, 'requestId', {
        id: '2',
        todolistId: 'todolistId2',
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
    expect(endState['todolistId2'][1].id).toBe('3')
})

test('correct task should be added to correct array', () => {
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
    const action = tasksThunks.addTasks.fulfilled({ task }, 'requestId', {
        todolistId: task.todoListId,
        title: task.title,
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const model = {
        id: '2',
        domainModel: { status: TaskStatuses.New },
        todolistId: 'todolistId2',
    }
    const action = tasksThunks.updateTask.fulfilled(model, 'requestId', model)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy()
    expect(endState['todolistId1'][1].status).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const model = {
        id: '2',
        domainModel: { title: 'Milkyway' },
        todolistId: 'todolistId2',
    }
    const action = tasksThunks.updateTask.fulfilled(model, 'requestId', model)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkyway')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new property with new array should be added when new todolist is added', () => {
    const action = todolistsActions.addTodolist({
        todolist: {
            id: v1(),
            title: 'title no matter',
            filter: 'all',
        },
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('propertry with todolistId should be deleted', () => {
    const action = todolistsActions.removeTodolist({ todolistId: 'todolistId2' })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})