import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

//TODO:
export function Todolist(props: TodoListPropsType) {
    // стейт для считывания того что написали в инпут:
    const [title, setTitle] = useState('')
    const [error, setError] = useState <string | null>(null)
//вынесли фугкции сюда из return:
    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(title)
            setTitle('')
        }
    }
    // функция добавления "таски":
    const addTask = () => {
        if (title.trim() === '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

        //очистили инпут после добавления таски - после отправки в BLL:
        setTitle('')
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    // считали значение с инпута чтобы связать с кнопкой:
                    value={title}
                    onChange={onNewTaskChangeHandler}
                    //логика onKeyPress как при нажатии на кнопку - копируем её...
                    onKeyDown={onKeyDownHandler}
                />
                {/*логика кнопки по добавлению таски и связывание кнопки с инпутом:*/}
                <button onClick={addTask}>+</button>
                {/*под кнопкой поле показывает текст ошибки*/}
                {error && <div className="error-message">{error}</div>}
                <ul>
                    {props.tasks.map((t) => {
                        // удаление "таски"
                        const onRemoveHandler = () => props.removeTask(t.id)
//изменение статуса чекбоеса:
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(t.id, e.currentTarget.checked)

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                className={error ? "error" : ''}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}
