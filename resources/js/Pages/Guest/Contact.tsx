import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'

type Props = {}

const Contact = ({auth}: PageProps) => {
  return (
    <>
        <Head title="Contact" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4  md:pt-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                Contacts page
            </div>
        </div>
    </>
  )
}

export default Contact