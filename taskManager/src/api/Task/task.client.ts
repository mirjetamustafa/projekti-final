import { apiRequest } from '../Api' // ky fie eshte  service / api layer
// ndermjetes mes React components dhe backend-it

export const createTask = async (taskData: any) => {
  // async --> sepse ben request HTTP (eshte operacon asinkron)
  return await apiRequest({
    // await -> pret derisa backend-i te pergjigjet
    // return ia kthen pergjigjen componentit
    url: 'api/tasks', // rruga e backendit http://localhost:4000/api/tasks
    method: 'POST', // krijm i te dhenave
    data: taskData, // data = body i request-it shkon te backendi si req.body
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
