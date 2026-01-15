export type Category = 'Personal' | 'Work' | 'Ideas'

export type Task = {
  id: string
  title: string
  description: string
  category: Category
}
