import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


// типизируем let [filter, setFilter] = useState:
export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {
// BLL
    // стейт удаления таски
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'GraphQl', isDone: true},
    ])
    // "стейт" логики фильтрации:
    let [filter, setFilter] = useState<FilterValuesType>('active')

// функция добавления таски:
    let addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    //для checkbox изменение его статуса:
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        // меняем на противоположное значение с true на false  наоборот:
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
// удаления таски:
    const removeTask = (id: string) => {
        let filtredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filtredTasks)
    }
    //функция фильрации:
    let changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    // логики фильтрации "КНОПОК" task чтобы пустить через props в TodoList не все, а отфильтрованные таски:
    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
// UI
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
};

export default App;
// git remote add origin git@github.com:Alex666000/TODO-home.git
