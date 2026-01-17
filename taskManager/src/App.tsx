import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router'
import { Routes } from './routes/Routes'
import { AuthProvider } from './lib/AuthContext'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="">
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
