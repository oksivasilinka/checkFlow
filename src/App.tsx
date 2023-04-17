import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todolistTitle: string = "What to learn"
    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS/ES6&TS", isDone: true},
        {id: v1(), title: "REACT/REDUX", isDone: true},
    ])

    const removeTask = (taskId: string) => {
        setTask(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTask([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTask(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }


    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={tasksWhatIWantToSee}
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
