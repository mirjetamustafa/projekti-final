import type { Category } from './types/task'

export const categoryColors: Record<
  Category,
  {
    dot: string
  }
> = {
  Work: {
    dot: 'bg-purple-500',
  },
  Personal: {
    dot: 'bg-blue-500',
  },
  Ideas: {
    dot: 'bg-green-500',
  },
}

export const categoryOptions = [
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Ideas', value: 'Ideas' },
]

export const statusOptions = [
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in progress' },
  { label: 'Done', value: 'done' },
]

export const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

export const statusOptionsFilter = [
  { label: 'All Status', value: '' },
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in progress' },
  { label: 'Done', value: 'done' },
]

export const priorityOptionsFilter = [
  { label: 'All Priority', value: '' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]
