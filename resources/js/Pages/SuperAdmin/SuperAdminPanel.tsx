import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import UsersTable from './Components/UsersTable'

const SuperAdminPanel = ({auth, users}: any) => {
  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Super admin panel</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-10">
            <UsersTable className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" users={users} tableHeight={"0"}/>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default SuperAdminPanel