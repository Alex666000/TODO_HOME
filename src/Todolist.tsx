import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType, todoId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
// TODO:
export function Todolist(props: TodoListPropsType) {
    // "стейт" для считывания того что написали в инпут:
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // функция добавления "таски":
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    // функция обработчик на впечатывание любого символа:
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // "зануляем" ошибку чтобы при введении слов перестало светиться ошибка:
        setError('')
        // логика на нажатие Enter:
        if (e.charCode === 13) {
            props.addTask(title)
            setTitle('')
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onNewTaskChangeHandler}
                    // логика обработчик на впечатывание любого символа (нажата любая клавиша внутри инпута):
                    onKeyPress={onKeyPressHandler}
                    // добавили класс ошибка если будет иначе не добавим:
                    className={error ? 'error' : ''}
                />
                {/*логика кнопки по добавлению таски и связывание кнопки с инпутом:*/}
                <button onClick={addTask}>+</button>
                {/*если ошибка, то покажи эту "div":*/}
                {error && <div className="error-message">{error}</div>}
                <ul>
                    {props.tasks.map((t) => {
                        // удаление "таски"
                        const onRemoveHandler = () => props.removeTask(t.id)
                        // изменение статуса инпута его checkbox:
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
// если таска выполнена делаем <li> полупрозрачной:
                        return <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                    }
                </ul>
                <div>
                    {/*кнопки для фильтрации элементов и проверяем пришел ли фильтр для классов активных кнопок*/}
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
