import { useEffect, useRef, useState } from 'react'
import { categoryColors } from '../utils/categoryColors'

type CardsProps = {
  title: string
  description?: string
  status: 'in progress' | 'done' | 'todo'
  category: string
  priority?: 'low' | 'medium' | 'high'
  onEdit?: () => void
  onDelete?: () => void
}

/*
🔹 Tipet TypeScript për props të komponentit Cards:

title → titulli i kartës (obligator)

description → opsionale, përshkrim i kartës

status → 'in progress' | 'done' | 'todo' për ngjyrosje

category → emri i kategorisë

priority → 'low' | 'medium' | 'high' (opsionale)
onEdit, onDelete → funksione opsionale që thirren kur klikohet Edit/Delete
*/

const statusStyle = {
  'in progress': 'bg-blue-100 text-blue-700',
  todo: 'bg-gray-100 text-gray-700',
  done: 'bg-green-100 text-green-700',
}

const priorityStyle = {
  low: 'border-l-gray-300',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-400',
}

const Cards = ({
  title,
  description,
  status,
  category,
  priority = 'medium',
  onEdit,
  onDelete,
}: CardsProps) => {
  const [openMenu, setOpenMenu] = useState(false) // State lokal që kontrollon nëse menu-ja e tre pikave (⋮) është e hapur.
  const menuRef = useRef<HTMLDivElement>(null)
  // Ref për div-in e menu-së.
  //Përdoret për të kuptuar klik jashtë menu-së.

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /*
  🔹 Efekti për klik jashtë menu-së:

Funksioni handleClickOutside kontrollon nëse klikimi ndodhet jashtë menuRef.

Nëse po, mbyll menu-n (setOpenMenu(false)).

Event listener mousedown shtohet kur komponenti mountohet dhe hiqet kur desmontohen.
  */

  return (
    <div
      className={`bg-white rounded-lg border-gray-200 p-4 border-l-4 hover:shadow-md ${priorityStyle[priority]} shadow-sm`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800"> {title} </h3>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          >
            ⋮
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-100  rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  setOpenMenu(false)
                  onEdit?.()
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false)
                  onDelete?.()
                }}
                className="w-full text-left px-3 py-2 text-red-600 text-sm hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-1 text-sm text-gray-500"> {description} </p>
      )}

      <div className="mt-3 flex items-center gap-3">
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${statusStyle[status]}`}
        >
          {status}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <span
            className={`w-2 h-2 rounded-full ${
              categoryColors[category]?.dot || 'bg-gray-400'
            }`}
          />
          {category}
        </div>
      </div>
    </div>
  )
}

export default Cards
