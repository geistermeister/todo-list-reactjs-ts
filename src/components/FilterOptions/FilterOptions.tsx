import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import './FilterOptions.css'

interface propTypes {
  onClose: Function,
  filters: { hideFinishedTasks: boolean },
  updateFilter: Function
}

export const FilterOptions = ({ onClose, filters, updateFilter }: propTypes): JSX.Element => {
  const [internalHideFinishedTasks, updateInternalHideFinishedTasks] = useState(filters.hideFinishedTasks)
  const useFilter = () => {
    updateFilter({ hideFinishedTasks: internalHideFinishedTasks })
    onClose()
  }
  return (
    <Modal onClose={() => onClose(false)} title={'Filter options'}>
      <div className={'filter-option-container'}>
        <input id={'hide-finished-tasks-checkbox'} type={'checkbox'} className={'hide-finished-tasks-checkbox'} checked={internalHideFinishedTasks} onChange={() => updateInternalHideFinishedTasks(!internalHideFinishedTasks)}/>
        <label htmlFor={'hide-finished-tasks-checkbox'}>{'Hide finished tasks'}</label>
      </div>
      <div className={'filter-options-footer'}>
        <button className={'filter-button'} onClick={useFilter}>{'Use filter'}</button>
      </div>
    </Modal>
  )
}