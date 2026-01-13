type CardsProps = {
  title: string
  description?: string
  status: 'in progress' | 'done' | 'todo'
  category: string
  priority?: 'low' | 'medium' | 'high'
}

const statusStyle = {
  'in progress': 'bg-blue-100 text-blue-700',
  todo: 'bg-gray-100 text-gray-700',
  done: 'bg-green-100 text-green-700',
}

const priorityStyle = {
  low: 'border-l-green-400',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-400',
}

const Cards = ({
  title,
  description,
  status,
  category,
  priority = 'medium',
}: CardsProps) => {
  return (
    <div
      className={`bg-white rounded-lg border-gray-200 p-4 border-l-4 hover:shadow-md ${priorityStyle[priority]} shadow-sm`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800"> {title} </h3>

        <button className="text-gray-400 hover:text-gray-600">⋮</button>
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
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          {category}
        </div>
      </div>
    </div>
  )
}

export default Cards
