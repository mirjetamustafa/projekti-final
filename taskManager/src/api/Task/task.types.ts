export interface TaskResponse {
  _id: string
  title: string
  description: string
  project: string
  status: string
  priority: string
}

export interface TaskFormType {
  title: string
  description: string
  project: string
  status: string
  priority: string
}
