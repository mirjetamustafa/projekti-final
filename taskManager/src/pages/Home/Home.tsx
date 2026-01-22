import { useEffect, useState } from 'react'
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
import { deleteTask, getTask } from '../../api/Task/task'
import { toast } from 'react-toastify'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [editTask, setEditTask] = useState<TaskResponse | null>(null)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  )
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      toast.success('Task deleted successfylly!')
      const updateTasks = await getTask()
      setTasks(updateTasks.data)
    } catch (err: any) {
      console.error(err)
      toast.error(err?.message ?? 'Could not delete the task')
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await getTask()
      setTasks(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = () => {
    setEditTask(null)
    setOpen(true)
  }

  const handleEdit = (task: TaskResponse) => {
    setEditTask(task)
    setOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchCategory = selectedCategory
      ? task.project === selectedCategory
      : true
    const matchStatus = selectedStatus ? task.status === selectedStatus : true
    const matchPriority = selectedPriority
      ? task.priority === selectedPriority
      : true

    const matchSearch = task.title
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase())

    return matchCategory && matchStatus && matchPriority && matchSearch
  })

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
              type="text"
              isSearch
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              icon={<SearchIcon className="w-4 h-4 text-gray-400" />}
            />

            <div className="grid grid-cols-2 gap-2">
              <Select
                options={statusOptionsFilter}
                value={selectedStatus || ''}
                onChange={(value) => setSelectedStatus(value || null)}
              />

              <Select
                options={priorityOptionsFilter}
                value={selectedPriority || ''}
                onChange={(value) => setSelectedPriority(value || null)}
              />
            </div>
          </div>

          <div className="p-6">
            <Task
              tasks={filteredTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
      <div className="flex justify-end bg-gray-50">
        <Button
          type="button"
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
              fetchTasks()
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
