import { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import type { Category } from '../../components/shared/utils/types/task'
import Input from '../../components/shared/Input/Input'
import SearchIcon from '../../assets/searchIcon.svg?react'
import Plus from '../../assets/plus.svg?react'
import Select from '../../components/shared/Select/Select'
import Modal from '../../components/shared/Modal/Modal'
import {
  priorityOptionsFilter,
  statusOptionsFilter,
} from '../../components/shared/utils/categoryColors'
import TaskForm from '../../components/TaskForm/TaskForm'
import Button from '../../components/shared/Button/Button'
import Task from '../../components/Tasks/Task'
import type { TaskResponse } from '../../api/Task/task.types'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const [editTask, setEditTask] = useState<TaskResponse | null>(null)

  const handleCreate = () => {
    setEditTask(null)
    setOpen(true)
  }

  const handleEdit = (task: TaskResponse) => {
    setEditTask(task)
    setOpen(true)
  }

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
              <Select options={statusOptionsFilter} />

              <Select options={priorityOptionsFilter} />
            </div>
          </div>

          <div className="p-6">
            <Task onEdit={handleEdit} />
          </div>
        </main>
      </div>
      <div className="flex justify-end bg-gray-50">
        <Button
          onClick={handleCreate}
          variant="icon"
          className="-mt-12 mx-3 mb-2 rounded-full"
        >
          <Plus />
        </Button>

        <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false)
            setEditTask(null)
          }}
          title={editTask ? 'Edit Task' : 'Create Task'}
        >
          <TaskForm
            initialData={editTask}
            onSuccess={() => {
              setOpen(false)
              setEditTask(null)
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Home
