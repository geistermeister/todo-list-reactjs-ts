import { useEffect, useState } from 'react'
import { ToDo } from "../ToDo/ToDo"
import { Modal } from '../Modal/Modal'
import { FilterOptions } from '../FilterOptions/FilterOptions'
import './ToDoList.css'

interface propTypes {
  todos: ITodos[],
  deleteTodo: Function,
  page: number,
  updatePage: Function,
  maxEntries: number,
  setCompleted: Function
}

interface ITodos {
  id: string, text: string, added: string, completed: boolean
}

interface IFilters {
  hideFinishedTasks: boolean
}

export const ToDoList = ({ todos, deleteTodo, page, updatePage, maxEntries, setCompleted }: propTypes): JSX.Element => {
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [filters, setFilters] = useState<IFilters>({ hideFinishedTasks: false })
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [reducedTodos, setReducedTodos] = useState<ITodos[]>([...todos])
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
  const applyFilters = (filters: IFilters) => {
    setFilters(filters)
    updatePage(1)
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
    <>
      {
        showFilterOptions &&
        <FilterOptions
          onClose={setShowFilterOptions}
          filters={filters}
          updateFilter={(filters: IFilters) => applyFilters(filters)}
        />
      }
      {
        showSortOptions &&
        <Modal onClose={() => setShowSortOptions(false)} title={'Sort options'}>

        </Modal>
      }
      <div className={'main-container'}>
        <div className={'menu'}>
          <span className={'mdi mdi-filter icon'} title={'Filter options'} onClick={() => setShowFilterOptions(true)}/>
          <span className={'mdi mdi-sort icon'} title={'Sort options'} onClick={() => setShowSortOptions(true)}/>
        </div>
        <div className={'todos-container'}>
          {
            Object.keys(reducedTodos).length > 0
              ? reducedTodos.map(todo => <ToDo todo={todo} deleteTodo={deleteTodo} setCompleted={setCompleted} key={todo.id}/>)
              : <></>
          }
        </div>
        <div className={'pagination-container'}>
          <span className={`mdi mdi-chevron-left icon ${page === 1 ? 'disabled' : ''}`} onClick={handlePreviousPage} title={'Previous page'}/>
          <span>{page}</span>
          <span className={`mdi mdi-chevron-right icon ${isMaxPage ? 'disabled' : ''}`} onClick={handleNextPage} title={'Next page'}/>
        </div>
      </div>
    </>
  )
}