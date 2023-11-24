import DangerButton from '@/Components/DangerButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { useToast } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import React from 'react'

const VenueSection = ({className, venues}: any) => {
  const [recentlySuccessful, setRecentlySuccessful] = React.useState(false)
    const navigateTo = (venue_id: any) => {
        router.get(route('admin.venue.view', {venue_id:venue_id}), {preserveScroll: true})
    }

    const deleteFunction = (venue_id: any) => {
      router.delete(route('admin.venue.delete', {venue_id:venue_id}), {
        preserveScroll: true,
        onSuccess: () => {
          setRecentlySuccessful(true)
        
        }
      })
    }

  return (
    <div className={className}>
    <div className='flex flex-row items-center justify-between mb-4'>
      <h1 className="text-gray-900 text-xl font-bold">Venues</h1>
      <PrimaryButton onClick={() => {router.get(route('admin.venue.createView'))}}>Create Venue</PrimaryButton>
    </div>
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
            )) : <span className='font-bold'>No venues found</span>}
          </tbody>
        </table>
    </div>
  </div>
  )
}

export default VenueSection