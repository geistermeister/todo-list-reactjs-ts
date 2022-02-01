import React, { useState } from 'react'
import { ToDoList } from './components/ToDoList/ToDoList'
import { Header } from './components/Header/Header'
import moment from 'moment'

import './App.css'

interface ITodo {
  id: string, text: string, added: string, completed: boolean
}

const App = () => {
  const [todos, updateTodos] = useState<ITodo[]>([])
  const [page, setPage] = useState(1)
  const maxEntries = 10
  const setCompleted = (id: string, completed: boolean) => {
    const buffer: ITodo[] = [...todos]
    const found = buffer.find(d => d.id === id)
    if (found) {
      found.completed = completed
    }
    updateTodos(buffer)
  }
  return (
    <div className={'mover'}>
      <div className={'content-container'}>
        <Header
          addTodo={(value: string) => updateTodos([ ...todos, { id: Date.now().toString(), text: value, added: moment().format('DD.MM.YYYY hh:mm:ss'), completed: false }])}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          todoLength={todos.length}
        />
        <ToDoList
          todos={todos}
          deleteTodo={(id: string) => updateTodos(todos.filter(todo => todo.id !== id))}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          setCompleted={(id: string, completed: boolean) => setCompleted(id, completed)}
        />
      </div>
    </div>
  )
}

export default App