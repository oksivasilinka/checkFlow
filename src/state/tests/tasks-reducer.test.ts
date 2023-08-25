import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from '../tasks-reducer';
import {addTodolistAC, removeTodolistAC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {v1} from "uuid";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", description: '', todoListId: '', order: 0, status: TaskStatuses.New,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: "2", title: "JS", description: '', todoListId: '', order: 0, status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: "3", title: "React", description: '', todoListId: '', order: 0, status: TaskStatuses.New,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: '', todoListId: '', order: 0, status: TaskStatuses.New,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: "2", title: "milk", description: '', todoListId: '', order: 0, status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
            {
                id: "3", title: "tea", description: '', todoListId: '', order: 0, status: TaskStatuses.New,
                priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
            },
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    expect(endState["todolistId2"][0].id).toBe("1");
    expect(endState["todolistId2"][1].id).toBe("3");

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: "3", title: "juce", description: '', todoListId: '', order: 0, status: TaskStatuses.New,
        priority: TaskPriorities.Hi, startDate: '', deadline: '', addedDate: '',
    }, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBeFalsy();
    expect(endState["todolistId1"][1].status).toBeTruthy();
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: v1(), title: "title no matter", filter: 'all'});
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('propertry with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




