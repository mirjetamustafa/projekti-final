import UserIcon from '../../assets/user.svg?react'
import LogoutIcon from '../../assets/logout.svg?react'
import Button from '../shared/Button/Button'
import { useAuthContext } from '../../lib/AuthContext'

const Header = () => {
  const { logout, user } = useAuthContext()
  return (
    <>
      <div className="flex justify-between p-5">
        {' '}
        {/*
         */}
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
            <div className="flex gap-2 text-xs mt-1.5">
              <UserIcon className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600">{user?.name}</p>
            </div>
            <div className="">
              <Button
                type="button"
                onClick={logout}
                className="flex items-center gap-1 bg-white text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
              >
                <LogoutIcon className="w-3 h-3 mt-0.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="border-b border-gray-100"></p>
    </>
  )
}

export default Header
