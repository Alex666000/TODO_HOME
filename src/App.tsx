import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
// типизируем let [filter, setFilter] = useState:
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {
    // state таски
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'GraphQl', isDone: true},
    ])
    // удаления таски:
    const removeTask = (id: string) => {
        let filtredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filtredTasks)
    }
    let addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
// изменение статуса checkbox:
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    let changeFilter = (value: FilterValuesType, todoId: string) => {

    }
// data:
    let todoLists: Array<TodolistsType> = [
        {id: v1(), title: ' What to learn', filter: 'active'},
        {id: v1(), title: ' What to buy', filter: 'completed'},
    ]
// UI
    return (
        <div className="App">
            {/*пробегаемся и отрисовываем разные туду: */}
            {todoLists.map((tl) => {
                // логика фильтрации:
                let tasksForTodoList = tasks
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasks.filter(t => !t.isDone)
                }
                return <Todolist
                    id={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    // отправляем вниз так кам компоненте значение filter нужно, чтобы подсветить кнопку:
                    filter={tl.filter}
                    changeTaskStatus={changeStatus}
                />
            })}
        </div>
    );
};
export default App;
