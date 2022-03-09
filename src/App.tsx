import React, { useState, useEffect, useReducer } from 'react'
import { ToDoList } from './components/ToDoList/ToDoList'
import { Header } from './components/Header/Header'
import { ITodo, IFilters } from 'utils/Interfaces'
import moment from 'moment'

import './App.css'

enum TYPES {
  ADD = 'add',
  DELETE = 'delete',
  TOGGLE = 'toggle'
}

interface Action {
  type: TYPES,
  todo?: string,
  id?: string
}

const handleToDo = (todos: ITodo[], action: Action) => {
  switch (action.type) {
    case TYPES.ADD: return [...todos, addToDo(action.todo!)]
    case TYPES.DELETE: return todos.filter(todo => todo.id !== action.id)
    case TYPES.TOGGLE: return todos.map(todo => {
      if (todo.id === action.id) {
        return {...todo, completed: !todo.completed }
      }
      return todo
    })
    default: {
      console.error(`Action type "${action.type}" not known!`)
      return todos
    }
  }
}

const addToDo = (todo: string) => {
  return {
    id: Date.now().toString(),
    text: todo,
    added: moment().format('DD.MM.YYYY HH:mm:ss'),
    completed: false
  }
}

const App = () => {
  const [todos, handleToDoEntry] = useReducer(handleToDo, [])
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<IFilters>({ hideFinishedTasks: false })
  const [reducedTodos, setReducedTodos] = useState<ITodo[]>([...todos])
  const maxEntries = 10

  useEffect(() => {
    const startIndex = (page - 1) * maxEntries
    const endIndex = maxEntries * page
    const buffer = [...todos]
    if (filters.hideFinishedTasks) {
      const result = buffer.filter(d => !d.completed).slice(startIndex, endIndex)
      setReducedTodos(result)
    }
    else {
      const result = buffer.slice(startIndex, endIndex)
      setReducedTodos(result)
    }
  }, [todos, filters, page])

  return (
    <div className={'mover'}>
      <div className={'content-container'}>
        <Header
          addTodo={handleToDoEntry}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          todoLength={reducedTodos.length}
        />
        <ToDoList
          todos={todos}
          reducedTodos={reducedTodos}
          handleToDoEntry={handleToDoEntry}
          page={page}
          updatePage={(newPage: number) => setPage(newPage)}
          maxEntries={maxEntries}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  )
}

export default App