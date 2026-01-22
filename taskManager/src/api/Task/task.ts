import { apiRequest } from '../Api' // importon funsonon apiRequest nga file Api
// ky funkson perdoret er te bere HTTP request (GET, OST, PUT, DELETE) zaonisht me axios
import type { TaskFormType, TaskResponse } from './task.types'

export const createTask = (task: TaskFormType) => {
  return apiRequest({
    // theret funksionin apiRequest kthen nje promise (response nga serveri)
    url: 'api/tasks', // endpointi i backendit do te beje request ne BASE_URL/api/tasks
    method: 'POST', // POST perdoret per krijim te dhenash
    data: task, // task dergohet ne body te requestit
  })
}

export const getTask = () => {
  return apiRequest({
    url: 'api/tasks',
    method: 'GET',
    // getTask nuk ka data sepse GET nuk dergon body
  })
}

export const updateTask = (_id: string, data: TaskResponse) => {
  return apiRequest({
    url: `api/tasks/${_id}`, // _id -> ID e taskut endpoint dinamik
    method: 'PUT',
    data, // data -> te dhenat e reja te taskut
  })
}

export const deleteTask = (_id: string) => {
  return apiRequest({
    url: `api/tasks/${_id}`,
    method: 'DELETE',
  })
}
