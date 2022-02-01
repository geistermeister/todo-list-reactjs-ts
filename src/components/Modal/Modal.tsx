import { useState } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

interface propTypes {
  children: React.ReactNode,
  onClose: Function,
  title: string,
  className?: string
}

export const Modal = ({ children, onClose, title, className }: propTypes) => {
  // character "!" is used here to say Typescript, that this could never be null in that case. The element with the id "portal" is added in index.html, so its always there. If the "!" is not added, Typescript throws an error.
  const [container] = useState(document.querySelector('#portal')!)
  const result = (
    <div className={'modal-back'}>
      <div className={`modal ${className || ''}`}>
        <div className={'modal-header-container'}>
          <span className={'title'}>{title}</span>
          <span className={'mdi mdi-close close'} onClick={() => onClose()} title={'Close'}/>
        </div>
        {children}
      </div>
    </div>
  )
  return ReactDOM.createPortal(result, container)
}