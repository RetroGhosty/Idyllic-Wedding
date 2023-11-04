import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import Footer from './Partial/Footer'

type Props = {}

const Booking = ({auth}: PageProps) => {
  return (
    <>
        <Head title="Booking" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4  md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                Booking Page
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Booking