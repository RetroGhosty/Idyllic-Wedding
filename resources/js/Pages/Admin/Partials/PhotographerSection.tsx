import DangerButton from '@/Components/DangerButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { router } from '@inertiajs/react'


const PhotographerSection = ({className, photographers}:any) => {
    const navigateTo = (photographer_id: any) => {
        router.get(route('admin.photographer.view', {photographer_id:photographer_id}), {preserveScroll: true})
      }
    const deleteFunction = (photographer_id: any) => {
        router.delete(route('admin.photographer.delete', {photographer_id:photographer_id}), {preserveScroll: true})
    }
  return (
    <div className={className}>
      <div className='flex flex-row items-center justify-between mb-4'>
        <h1 className="text-gray-900 text-xl font-bold">Photographers</h1>
        <PrimaryButton onClick={() => {router.get(route('admin.photographer.createView'))}}>Create Profile</PrimaryButton>
      </div>
      <div className='relative overflow-x-auto sm:rounded-lg'>
          <table className='w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Facebook</th>
                <th>Instagram</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {photographers.length !== 0 ? photographers.map((photographer: any, index: number) => (
                <tr key={index}>
                  <td>{photographer['id']}</td>
                  <td>{photographer['first_name']}</td>
                  <td>{photographer['last_name']}</td>
                  <td>{photographer['email']}</td>
                  <td>{photographer['phone_number']}</td>
                  <td>{photographer['facebook_contact']}</td>
                  <td>{photographer['instagram_contact']}</td>
                  <td>
                    <div className='flex flex-row space-x-2'>
                      <PrimaryButton onClick={() => navigateTo(photographer['id'])} className='pe-3 m-0'>Edit</PrimaryButton>
                      <DangerButton onClick={() => deleteFunction(photographer['id'])}>Delete</DangerButton>
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

export default PhotographerSection