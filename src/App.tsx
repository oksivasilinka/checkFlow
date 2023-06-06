import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

function App() {
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
        setTodolists((todolists.filter(el => el.id !== todolistId)))
        delete tasks[todolistId]
        console.log('del')
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    const addTodolist = (newTitle: string) => {
        const todolistId = v1()
        const newTodolist: TodolistsType = {id: todolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})

    }

    const updateTodolist = (todolistTd: string, updateTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistTd ? {...el, title: updateTitle} : el))
    }

    const updateTask = (todolistTd: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks, [todolistTd]: tasks[todolistTd].map(el => el.id === taskId
                ? {...el, title: updateTitle}
                : el)
        })
    }

    return (
        <div className="App">

            <ButtonAppBar/>
           <Container fixed >
               <Grid container  style={{padding: "15px"}}>
                   <AddItemForm callBack={addTodolist}/>
               </Grid>



               <Grid container spacing={4}>
                   {todolists.map(el => {
                       let tasksForTodolist = tasks[el.id];

                       if (el.filter === "active") {
                           tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                       }
                       if (el.filter === "completed") {
                           tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                       }
                       return (
                           <Grid item>
                               <Paper elevation={3} style={{padding: "25px"}}>
                                   <Todolist key={el.id}
                                             title={el.title}
                                             todolistId={el.id}
                                             tasks={tasksForTodolist}
                                             removeTask={removeTask}
                                             changeFilter={changeFilter}
                                             addTask={addTask}
                                             changeTaskStatus={changeStatus}
                                             filter={el.filter}
                                             removeTodolist={removeTodolist}
                                             updateTask={updateTask}
                                             updateTodolist={updateTodolist}
                                   />
                               </Paper>
                           </Grid>

                       )
                   })}
               </Grid>


           </Container>


        </div>
    );
}

export default App;
