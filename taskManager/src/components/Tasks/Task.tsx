import { useEffect, useState } from 'react'
import type { TaskResponse } from '../../api/Task/task.types'
import { getTask } from '../../api/Task/task'
import Cards from '../shared/Cards/Cards'

type TaskProps = {
  onEdit: (task: TaskResponse) => void
}

const Task = ({ onEdit }: TaskProps) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTask()
        setTasks(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Faild to load tasks')
      }
    }
    fetchTasks()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {tasks.map((task) => (
        <div key={task._id}>
          <Cards
            title={task.title}
            description={task.description}
            status={task.status}
            category={task.project}
            priority={task.priority}
            onEdit={() => onEdit(task)}
          />
        </div>
      ))}
    </div>
  )
}

export default Task
