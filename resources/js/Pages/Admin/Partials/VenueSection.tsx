import DangerButton from '@/Components/DangerButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { router } from '@inertiajs/react'

const VenueSection = ({className, venues}: any) => {
    const navigateTo = (venue_id: any) => {
        router.get(route('admin.venue.view', {venue_id:venue_id}))
    }

    const deleteFunction = (venue_id: any) => {
      router.delete(route('admin.venue.delete', {venue_id:venue_id}))
    }
  return (
    <div className={className}>
    <h1 className="text-gray-900 text-xl font-bold mb-6">Venues</h1>
    <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue</th>
              <th>Head Limit</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {venues.length !== 0 ? venues.map((venue: any, index: number) => (
              <tr key={index}>
                <td>{venue['id']}</td>
                <td>{venue['venue_name']}</td>
                <td>{venue['limit']}</td>
                <td>{venue['price']}</td>
                <td>
                  <div className='flex flex-row space-x-2'>
                    <PrimaryButton onClick={() => navigateTo(venue['id'])} className='pe-3 m-0'>Edit</PrimaryButton>
                    <DangerButton onClick={() => deleteFunction(venue['id'])}>Delete</DangerButton>
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

export default VenueSection