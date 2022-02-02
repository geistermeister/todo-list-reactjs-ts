import { useEffect, useState } from 'react'
import { ToDo } from "../ToDo/ToDo"
import { Modal } from '../Modal/Modal'
import { FilterOptions } from '../FilterOptions/FilterOptions'
import { ITodo, IFilters } from 'utils/Interfaces'
import './ToDoList.css'

interface propTypes {
  // all todos
  todos: ITodo[],
  // The todos which are displayed currently (pagination)
  reducedTodos: ITodo[],
  deleteTodo: Function,
  page: number,
  updatePage: Function,
  maxEntries: number,
  setCompleted: Function,
  filters: IFilters,
  setFilters: Function
}


export const ToDoList = ({ filters, setFilters, todos, reducedTodos, deleteTodo, page, updatePage, maxEntries, setCompleted }: propTypes): JSX.Element => {
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [isMaxPage, setIsMaxPage] = useState(true)
  
  useEffect(() => {
    setIsMaxPage(!(todos.length - (page * maxEntries) > 0))
  }, [todos.length, page])

  const handlePreviousPage = () => {
    if (page > 1) {
      updatePage(page - 1)
    }
  }
  const handleNextPage = () => {
    if (!isMaxPage) {
      updatePage(page + 1)
    }
  }

  const applyFilters = (filters: IFilters) => {
    setFilters(filters)
    updatePage(1)
  }
  const activeFilters = Object.values(filters).filter(d => d).length

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
          <div className={'filter-icon-container'}>
            <span className={'mdi mdi-filter icon'} title={'Filter options'} onClick={() => setShowFilterOptions(true)}/>
            { activeFilters > 0 && <div className={'filter-counter'} title={`${activeFilters} active filters.`}>{activeFilters}</div>}
          </div>
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