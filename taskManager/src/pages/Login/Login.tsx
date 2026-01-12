import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import PasswordField from '../../components/PasswordField/PasswordField'

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="grid justify-center">
        <div className="grid grid-cols-1 justify-items-center my-5">
          <h1 className="text-2xl font-bold py-1 text-blue-500">Login</h1>
        </div>
        <div className="border border-gray-200 bg-white shadow-xs rounded-md p-5 w-[450px]">
          <form>
            <div className=" m-3">
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
              />
              <PasswordField label="Password" placeholder="••••••••" />
              <Button>Sign in</Button>
            </div>
          </form>
          <p className="text-xs text-center text-gray-500">
            Don't have an account?{' '}
            <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
