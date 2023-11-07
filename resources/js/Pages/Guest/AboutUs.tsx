import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'

type Props = {}

const AboutUs = ({auth}: PageProps) => {
  return (
    <>
        <Head title="About" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen py-5 max-w-7xl md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                About Us
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default AboutUs