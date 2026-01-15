import Button from '../shared/Button/Button'
import { categoryColors } from '../shared/utils/categoryColors'
import type { Category } from '../shared/utils/types/task'

type SidebarProps = {
  selectedCategory: Category | null
  onSelectedCategory: (category: Category | null) => void
}

const categories: Category[] = ['Personal', 'Work', 'Ideas']

const Sidebar = ({ selectedCategory, onSelectedCategory }: SidebarProps) => {
  return (
    <aside className="w-64 border-r p-4 space-y-1">
      <Button
        onClick={() => onSelectedCategory(null)}
        variant={selectedCategory === null ? 'active' : 'default'}
        className={`p-2 ${
          selectedCategory === null ? 'bg-gray-100' : ''
        } hover:bg-gray-100`}
      >
        All Tasks
      </Button>

      {categories.map((cat) => {
        const colors = categoryColors[cat]

        return (
          <Button
            key={cat}
            onClick={() => onSelectedCategory(cat)}
            variant={selectedCategory === cat ? 'active' : 'default'}
            className={`flex items-center gap-3 p-2 hover:bg-gray-100 ${
              selectedCategory === cat ? 'bg-gray-100' : ''
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
            <span> {cat} </span>
          </Button>
        )
      })}
    </aside>
  )
}

export default Sidebar
