import { type ReactNode } from 'react'
import Close from '../../../assets/close.svg?react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          {title && <h2 className="text-lg font-semibold"> {title} </h2>}

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 transition cursor-pointer hover:text-gray-500"
            aria-label="Close modal"
          >
            <Close className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
