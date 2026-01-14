import { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import type { Category, Task } from '../../components/types/task'
import Cards from '../../components/shared/Cards/Cards'

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
      <div className="flex h-[657px]">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-semibold mb-4">
            {selectedCategory ?? 'All Tasks'}
          </h1>

          <div className="grid grid-cols-3 gap-4">
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
