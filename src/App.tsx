import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
// типизируем let [filter, setFilter] = useState:
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {
    // удаления таски:
    const removeTask = (id: string, todolistId: string) => {
        // находим нужный массив:
        let tasks = tasksObject[todolistId]
        // получаем в этом массиве отфильрованные таски:
        let filtredTasks = tasks.filter(t => t.id != id)
        //  в этом объекте заменить таски которые достали заменить отфильтрованными тасками:
        tasksObject[todolistId] = filtredTasks
        setTasksObject({...tasksObject})
    }
    let addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasksObject]
        setTasksObject(newTasks)
    }
// изменение статуса checkbox:
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasksObject.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObject([...tasksObject])
    }
    // функция фильтрации получая эти параметры будет знать по id, в каком туду произошло изменение
    let changeFilter = (value: FilterValuesType, todoId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }
// data:
    let todolistId1 = v1() // skd-34-ff
    let todolistId2 = v1()
// data:
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: ' What to learn', filter: 'active'},
        {id: v1(), title: ' What to buy', filter: 'completed'},
    ])
// data:
    let [tasksObject, setTasksObject] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'GraphQl', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ],
    })

// UI
    return (
        <div className="App">
            {/*пробегаемся и отрисовываем разные туду: */}
            {todoLists.map((tl) => {
                // логика фильтрации:
                let tasksForTodoList = tasksObject[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
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
