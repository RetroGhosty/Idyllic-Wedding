import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'

type Props = {}

const Booking = ({auth}: PageProps) => {
  return (
    <>
        <Head title="Booking" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4  md:pt-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                Booking Page
            </div>
        </div>
    </>
  )
}

export default Booking