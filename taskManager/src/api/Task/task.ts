import { apiRequest } from '../Api'
import type { TaskFormType, TaskResponse } from './task.types'

export const createTask = (task: TaskFormType) => {
  console.log('Sending task:', task)
  return apiRequest({
    url: 'api/tasks',
    method: 'POST',
    data: task,
  })
}

export const getTask = () => {
  return apiRequest({
    url: 'api/tasks',
    method: 'GET',
  })
}

export const updateTask = (_id: string, data: TaskResponse) => {
  return apiRequest({
    url: `api/tasks/${_id}`,
    method: 'PUT',
    data,
  })
}

export const deleteTask = (_id: string) => {
  return apiRequest({
    url: `api/tasks/${_id}`,
    method: 'DELETE',
  })
}
