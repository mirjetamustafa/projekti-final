export type Category = 'Personal' | 'Work' | 'Ideas' | 'Marketing'

export type Task = {
  id: string
  title: string
  description: string
  category: Category
}
