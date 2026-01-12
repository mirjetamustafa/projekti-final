import { apiRequest } from '../Api'

export const createTask = async (taskData: any) => {
  return await apiRequest({
    url: 'api/tasks',
    method: 'POST',
    data: { task, taskData },
  })
}

export const getTasks = async () => {
  return await apiRequest<any, any>({
    url: 'api/tasks',
    method: 'GET',
  })
}

export const getTasksById = async (id: string) => {
  return await apiRequest<any, any>({
    url: `api/tasks/${id}`,
    method: 'GET',
  })
}

export const updateTaskById = async (id: string, data: any) => {
  return await apiRequest<any, any>({
    url: `api/tasks/${id}`,
    method: 'PUT',
    data: { task: data },
  })
}

export const deleteTasks = async (id: any) => {
  return await apiRequest<any, any>({
    url: `api/tasks/${id}`,
    method: 'DELETE',
  })
}
