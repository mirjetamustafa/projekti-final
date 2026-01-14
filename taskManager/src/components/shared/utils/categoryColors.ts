import type { Category } from '../../types/task'

export const categoryColors: Record<
  Category,
  {
    dot: string
    border: string
  }
> = {
  Work: {
    dot: 'bg-purple-500',
    border: 'border-l-purple-600',
  },
  Personal: {
    dot: 'bg-blue-500',
    border: 'border-l-blue-600',
  },
  Ideas: {
    dot: 'bg-green-500',
    border: 'border-l-green-600',
  },
}
