import { useState, KeyboardEvent } from "react"

import './Header.css'

interface propTypes {
  addTodo: Function,
  page: number,
  updatePage: Function,
  maxEntries: number,
  todoLength: number
}

export const Header = ({ addTodo, page, updatePage, maxEntries, todoLength }: propTypes): JSX.Element => {
  const [todo, changeTodo] = useState('')
  const add = () => {
    if (todo !== '') {
      addTodo(todo)
      changeTodo('')
      if ((todoLength / page) === maxEntries) {
        updatePage(page + 1)
      }
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      add()
    }
  }
  return (
    <div className={'header-container'}>
      <input className={'todo-input'} value={todo} onChange={event => changeTodo(event.target.value)} placeholder={"Enter ToDo"} onKeyDown={handleKeyDown}/>
      <span className={'mdi mdi-playlist-plus add-todo'} onClick={() => add()} title={'Add'}/>
    </div>
  )
}