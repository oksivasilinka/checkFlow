import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}
function App() {

    // const todolistTitle: string = "What to learn"
    // const [tasks, setTask] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: false},
    //     {id: v1(), title: "JS/ES6&TS", isDone: true},
    //     {id: v1(), title: "REACT/REDUX", isDone: true},
    // ])
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskAssocType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists((todolists.filter(el=> el.id !== todolistId)))
        delete tasks[todolistId]
        console.log('del')
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        // setTask(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // setTask([newTask, ...tasks])
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(
                el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)})
        // setTask(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    // const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (todolistId: string, nextFilter: FilterValuesType) => {
        setTodolists(todolists.map(el =>el.id === todolistId ? {...el, filter: nextFilter} : el))
        // setFilter(nextFilter)
    }

    return (
        <div className="App">
            {todolists.map(el=> {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        filter={el.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />

                )
            })}

        </div>
    );
}

export default App;
