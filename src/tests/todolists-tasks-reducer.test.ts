import {TodolistDomainType, todolistsActions, todolistsReducer} from "state/todolists-reducer"
import { tasksReducer, TasksStateType } from "state/tasks-reducer"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = todolistsActions.addTodolist({
    todolist: {
      id: v1(),
      title: "new todolist",
      filter: "all",
    }
  })
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
