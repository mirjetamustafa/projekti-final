import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export interface AxiosRequestOptions<D = any> extends AxiosRequestConfig<D> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: D
  params?: Record<string, any>
  headers?: Record<string, string>
}

export async function apiRequest<D = unknown, R = unknown>({
  url,
  method = 'GET',
  data,
  params,
  headers = {},
}: AxiosRequestOptions<D>): Promise<AxiosResponse<R>> {
  try {
    const response = await axios.request<D, AxiosResponse<R>>({
      baseURL: import.meta.env.VITE_SERVER_URL, // psh: http://localhost:4000/
      url,
      method,
      data,
      params,
      headers: {
        'Content-Type': 'application/json', // gjithmonë JSON
        ...headers,
      },
    })
    return response
  } catch (error: any) {
    console.error('API request failed:', error.response?.data || error.message)
    throw error.response?.data || error
  }
}
