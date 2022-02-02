import React, { useState, useEffect } from 'react'
import { ToDoList } from './components/ToDoList/ToDoList'
import { Header } from './components/Header/Header'
import { ITodo, IFilters } from 'utils/Interfaces'
import moment from 'moment'

import './App.css'



const App = () => {
  const [todos, updateTodos] = useState<ITodo[]>([])
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<IFilters>({ hideFinishedTasks: false })
  const [reducedTodos, setReducedTodos] = useState<ITodo[]>([...todos])
  const maxEntries = 10
  const setCompleted = (id: string, completed: boolean) => {
    const buffer: ITodo[] = [...todos]
    const found = buffer.find(d => d.id === id)
    if (found) {
      found.completed = completed
    }
    updateTodos(buffer)
  }

  useEffect(() => {
    const startIndex = (page - 1) * maxEntries
    const endIndex = maxEntries * page  
    const buffer = [...todos]
    if (filters.hideFinishedTasks) {
      let result = buffer.filter(d => !d.completed).slice(startIndex, endIndex)
      setReducedTodos(result)
    }
    else {
      let result = buffer.slice(startIndex, endIndex)
      setReducedTodos(result)
    }
  }, [todos, filters, page])

  return (
    <div className={'mover'}>
      <div className={'content-container'}>
        <Header
          addTodo={(value: string) => updateTodos([ ...todos, { id: Date.now().toString(), text: value, added: moment().format('DD.MM.YYYY HH:mm:ss'), completed: false }])}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          todoLength={reducedTodos.length}
        />
        <ToDoList
          todos={todos}
          reducedTodos={reducedTodos}
          deleteTodo={(id: string) => updateTodos(todos.filter(todo => todo.id !== id))}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          setCompleted={(id: string, completed: boolean) => setCompleted(id, completed)}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  )
}

export default App