import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';

const Dashboard = ({auth, users}:PageProps) => {
  const navigateTo = (user_id: any) => {
    router.get(route('admin.user.view', {user_id:user_id}))
  }
  

  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Welcome to admin panel!</div>
            <div className='px-6 pb-6 relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Email Verified at</th>
                    <th>User level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {users.length !== 0 ? users.map((user, index) => (
                    <tr key={index}>
                      <td>{user['id']}</td>
                      <td>{user['name']}</td>
                      <td>{user['email']}</td>
                      <td>{user['email_verified_at']}</td>
                      <td>{user['user_level']}</td>
                      <td>
                        <div>
                          <button onClick={() => navigateTo(user['id'])} className='pe-3 m-0'>Edit</button>
                          <button>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )) : <span className='font-bold'>No users found in database</span>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Dashboard