import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
// axios librari per te bere kerkesa HTTP(GET, POST, PUT DELETE)
// AxiosRequestConfig tip typescript per konfigurimin e nje requesti
// AxiosResponse tip typescript per pergjigjen qe vjen nga serveri
// type perdoret sepse keto jane vetem tipa jo kod qe ekzekutohet

export interface AxiosRequestOptions<D = any> extends AxiosRequestConfig<D> {
  url: string // url e detyrueshme
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' // methood opsonale (default eshte GET)
  data?: D // body per POST / PUT
  params?: Record<string, any> // query params (?page=1)
  headers?: Record<string, string> // header shtese
  // kjo e ben kodin te sigurt dhe te qarte ne typescript
}
// Interface AxiosRequestOptions --- Kjo interface pershkruan se cfare te dhenash
// pranon funksioni apiRequest
// D = any -- tipi i te dhenave qe dergohen (body)
// extends AxiosRequestConfig -- trashegon opsionet standarde te axios

export async function apiRequest<D = unknown, R = unknown>({
  // unknown -- do te thote nese nuk e specifikon vete tipin
  // TypeScript do ta trajtoje data-n sii te unknown(te pa njohur) jo any
  // D -- tipi i data qe dergojme
  // R -- tipi data qe marrim nga serveri

  // Destructuring i arametrave url method...
  // nxjerr vlera nga objekti
  // vendos vlera default
  url,
  method = 'GET',
  data,
  params,
  headers = {},
}: AxiosRequestOptions<D>): Promise<AxiosResponse<R>> {
  // thirrja e axios D --- data qe dergon, R --- data qe pret nga serveri
  // D dhe R jane Generic types ne typescript
  // D -> cfare po dergon te serveri (request body)
  // R -> cfare po merr nga serveri (response data)
  // D = Data(request body)
  // R = Response (data qe kthen)
  // lexohet keshtu
  // Po bej nje request ku po dergoj D(data type) dhe pres nje response qe permban R(response type)
  try {
    const response = await axios.request<D, AxiosResponse<R>>({
      // konfigurimi i request-it
      baseURL: import.meta.env.VITE_SERVER_URL, // url baze nga .env
      url, // url psh api/tasks
      method,
      data,
      params,
      headers: {
        'Content-Type': 'application/json', // Content-type -- JSON
        ...headers, // headers --- shton header te tjere nese i jep
      },
    })
    return response // kthen pergjgjen e plote te axios, jo vetem data
  } catch (error: any) {
    console.error('API request failed:', error.response?.data || error.message)
    // printon error ne console
    throw error.response?.data || error
    // hedh errorin qe komponenti ta kape me try/catch
  }
}
