
import {addTodolistAC, todolistsReducer} from '../todolists-reducer';
import {tasksReducer, TasksStateType} from '../tasks-reducer';
import {TodolistType} from "../../App";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC( {id: v1(),    title: "new todolist",    filter: 'all'});
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
