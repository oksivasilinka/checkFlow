import { Task, TaskResponse, TodolistDomain } from 'features'
import s from './Tasks.module.css'

type Props = {
    tasks: TaskResponse[]
    todolist: TodolistDomain
}

export const Tasks = ({ tasks, todolist }: Props) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => !t.status)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status)
    }

    return (
        <div className={s.tasksWrapper}>
            {tasksForTodolist?.map((t) => {
                return <Task key={t.id} task={t} />
            })}
            <div>{!tasks.length && <span className={s.text}>Create your first task!</span>}</div>
        </div>
    )
}
