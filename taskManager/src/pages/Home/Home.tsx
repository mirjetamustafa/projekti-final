import { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import type { Category, Task } from '../../components/types/task'
import Cards from '../../components/shared/Cards/Cards'
import Input from '../../components/shared/Input/Input'
import SearchIcon from '../../assets/searchIcon.svg?react'
import Select from '../../components/shared/Select/Select'

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Desc',
    status: 'done',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Desc',
    status: 'in progress',
    category: 'Personal',
    priorty: 'high',
  },
]

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const filteredTasks = selectedCategory
    ? tasks.filter((t) => t.category === selectedCategory)
    : tasks

  return (
    <div>
      <Header />
      <div className="flex h-[657px] bg-gray-50">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />

        <main className="flex-1">
          <div className="bg-white p-6">
            <Input
              placeholder="Search tasks..."
              isSearch
              onChange={() => {}}
              icon={<SearchIcon className="w-4 h-4 text-gray-400" />}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="all status" />
              <Input placeholder="All priorty" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-6">
            {filteredTasks.map((task) => (
              <div key={task.id}>
                <Cards
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  category={task.category}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
