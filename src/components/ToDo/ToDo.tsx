import { useState } from 'react'
import { ITodo } from 'utils/Interfaces'
import './ToDo.css'

interface propTypes {
  todo: ITodo,
  handleToDoEntry: Function
}

export const ToDo = ({ todo, handleToDoEntry }: propTypes): JSX.Element => {
  const [showDelete, setShowDelete] = useState(false)
  return (
    <div className={'todo-container'} onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
      <input className={'checkbox-todo'} type={'checkbox'} checked={todo.completed} onChange={() => handleToDoEntry({ type: 'toggle', id: todo.id })}/>
      <div className={'information-container'}>
        <span className={`todo-datetime ${todo.completed ? 'finished' : ''}`} title={todo.added}>{todo.added}</span>
        <span className={`todo-text ${todo.completed ? 'finished' : ''}`} title={todo.text}>{todo.text}</span>
      </div>
      {
        showDelete &&
        <span className={'mdi mdi-delete delete-todo'} title={'Delete'} onClick={() => handleToDoEntry({ type: 'delete', id: todo.id })}/>
      }
    </div>
  )
}