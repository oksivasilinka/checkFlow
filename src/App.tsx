import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {
    const todolistTitle_1: string = "What to learn"
    const todolistTitle_2: string = "What to buy"
    const tasks_1: Array<TaskType> =[
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS/ES6&TS", isDone: true},
        {id: 3, title: "REACT/REDUX", isDone: true},
    ]
    const tasks_2: Array<TaskType> =[
        {id: 4, title: "BREAD", isDone: true},
        {id: 5, title: "WATER", isDone: false},
        {id: 6, title: "SALT", isDone: true},
    ]
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks_1}
            />
            <Todolist
                title={todolistTitle_2}
                tasks={tasks_2}
            />

        </div>
    );
}

export default App;
