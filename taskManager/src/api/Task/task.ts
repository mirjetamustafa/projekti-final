import { apiRequest } from '../Api'
import type { TaskFormType, TaskResponse } from './task.types'

export const createTask = (task: any) => {
  console.log('Sending task:', task)
  return apiRequest({
    url: 'api/tasks',
    method: 'POST',
    data: task,
  })
}
