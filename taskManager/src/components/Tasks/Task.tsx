import type { TaskResponse } from '../../api/Task/task.types'
import Cards from '../shared/Cards/Cards'

type TaskProps = {
  tasks: TaskResponse[]
  onEdit: (task: TaskResponse) => void
  onDelete: (task: TaskResponse) => void
}

const Task = ({ tasks, onEdit, onDelete }: TaskProps) => {
  //   const [loading, setLoading] = useState(true)
  //   const [error, setError] = useState('')

  //   if (loading) return <p>Loading...</p>
  //   if (error) return <p className="text-red-500">{error}</p>
  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-scroll h-110">
      {tasks.map((task) => (
        <div key={task._id}>
          <Cards
            title={task.title}
            description={task.description}
            status={task.status}
            category={task.project}
            priority={task.priority}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task._id)}
          />
        </div>
      ))}
    </div>
  )
}

export default Task
