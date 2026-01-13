import UserIcon from '../../assets/user.svg?react'
const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <div className="">
          <h2 className="font-semibold">Task Manager</h2>
          <p className="text-xs text-gray-500">
            Organize your project efficiently
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <div className="flex text-xs">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">Mirjeta Mustafa</p>
          </div>

          <div className="flex text-xs">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
