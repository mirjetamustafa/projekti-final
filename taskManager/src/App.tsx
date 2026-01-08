import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    async function grabData() {
      const response = await axios.get('http://localhost:3000/')
      if (response.status === 200) {
        setData(response.data)
      }
    }
    grabData()
  }, [])

  return <div>{JSON.stringify(data)}</div>
}

export default App
