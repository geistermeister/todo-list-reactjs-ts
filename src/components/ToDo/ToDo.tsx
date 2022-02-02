import { useState } from 'react'
import { ITodo } from 'utils/Interfaces'
import './ToDo.css'

interface propTypes {
  todo: ITodo,
  deleteTodo: Function,
  setCompleted: Function
}

export const ToDo = ({ todo, deleteTodo, setCompleted }: propTypes): JSX.Element => {
  const [showDelete, setShowDelete] = useState(false)
  return (
    <div className={'todo-container'} onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
      <input className={'checkbox-todo'} type={'checkbox'} checked={todo.completed} onChange={() => setCompleted(todo.id, !todo.completed)}/>
      <div className={'information-container'}>
        <span className={`todo-datetime ${todo.completed ? 'finished' : ''}`} title={todo.added}>{todo.added}</span>
        <span className={`todo-text ${todo.completed ? 'finished' : ''}`} title={todo.text}>{todo.text}</span>
      </div>
      {
        showDelete &&
        <span className={'mdi mdi-delete delete-todo'} title={'Delete'} onClick={() => deleteTodo(todo.id)}/>
      }
    </div>
  )
}