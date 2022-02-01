import { useState } from "react"
import { ToDo } from "../ToDo/ToDo"

import './ToDoList.css'

interface propTypes {
  todos: { id: string, text: string, added: string, completed: boolean }[],
  deleteTodo: Function,
  page: number,
  updatePage: Function,
  maxEntries: number,
  setCompleted: Function
}

export const ToDoList = ({ todos, deleteTodo, page, updatePage, maxEntries, setCompleted }: propTypes): JSX.Element => {
  const reducedTodos = todos.slice((page - 1) * maxEntries, maxEntries * page)
  const handlePreviousPage = () => {
    if (page > 1) {
      updatePage(page - 1)
    }
  }
  const isMaxPage = !(todos.length - (page * maxEntries) > 0)
  const handleNextPage = () => {
    if (!isMaxPage) {
      updatePage(page + 1)
    }
  }
  return (
    <div className={'main-container'}>
      <div className={'todos-container'}>
        {
          Object.keys(reducedTodos).length > 0
            ? reducedTodos.map(todo => <ToDo todo={todo} deleteTodo={deleteTodo} setCompleted={setCompleted}/>)
            : <></>
        }
      </div>
      <div className={'pagination-container'}>
        <span className={`mdi mdi-chevron-left chevron ${page === 1 ? 'disabled' : ''}`} onClick={handlePreviousPage} title={'Previous page'}/>
        <span>{page}</span>
        <span className={`mdi mdi-chevron-right chevron ${isMaxPage ? 'disabled' : ''}`} onClick={handleNextPage} title={'Next page'}/>
      </div>
    </div>
  )
}