import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosRequestOptions<D> extends AxiosRequestConfig<D> {
  excludeAuthentication?: boolean
}

export async function apiRequest<D = {}, R = unknown>({
  url,
  method,
  data,
  headers,
  params,
}: AxiosRequestOptions<D>) {
  return await axios.request<D, AxiosResponse<R>>({
    url: `${import.meta.env.TASK_SERVER_URL}/${url}`,
    method,
    data,
    headers,
    params,
  })
}
