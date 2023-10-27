import DangerButton from '@/Components/DangerButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { router } from '@inertiajs/react'
import React from 'react'

const UserSection = ({className, users}: any) => {
  const navigateTo = (user_id: any) => {
    router.get(route('admin.user.view', {user_id:user_id}))
  }

  return (
    <div className={className}>
      <div className="text-gray-900">Users</div>
        <div className='relative overflow-x-auto sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Email Verified at</th>
                <th>User level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {users.length !== 0 ? users.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{user['id']}</td>
                  <td>{user['first_name']}</td>
                  <td>{user['last_name']}</td>
                  <td>{user['email']}</td>
                  <td>{user['email_verified_at']}</td>
                  <td>{user['user_level']}</td>
                  <td>
                    <div className='flex flex-row space-x-2'>
                      <PrimaryButton onClick={() => navigateTo(user['id'])} className='pe-3 m-0'>Edit</PrimaryButton>
                      <DangerButton>Delete</DangerButton>
                    </div>
                  </td>
                </tr>
              )) : <span className='font-bold'>No users found in database</span>}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default UserSection