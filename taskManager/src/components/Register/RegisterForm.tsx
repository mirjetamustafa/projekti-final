import Button from '../shared/Button/Button'
import Input from '../shared/Input/Input'
import PasswordField from '../shared/PasswordField/PasswordField'

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="grid justify-center">
        <div className="grid grid-cols-1 justify-items-center my-5">
          <h1 className="text-2xl font-bold py-1 text-blue-500">
            Create account
          </h1>
        </div>
        <div className="border border-gray-200 bg-white shadow-xs rounded-md p-5 w-[450px]">
          <form>
            <div className=" m-3">
              <Input label="Name" type="text" placeholder="John Doe" />
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
              />
              <PasswordField label="Password" placeholder="••••••••" />
              <PasswordField label="Confirm Password" placeholder="••••••••" />
              <Button className="bg-blue-600 text-white py-3 my-3">
                Create account
              </Button>
            </div>
          </form>
          <p className="text-xs text-center text-gray-500">
            Already have an account?{' '}
            <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
