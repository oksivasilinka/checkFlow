import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todolistTitle: string = "What to learn"
    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS/ES6&TS", isDone: true},
        {id: 3, title: "REACT/REDUX", isDone: true},
    ])

    const removeTask = (taskId: number) => {
        setTask(tasks.filter(t => t.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }

    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
