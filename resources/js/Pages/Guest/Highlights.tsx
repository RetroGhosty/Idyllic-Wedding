import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'
import HeaderPopUp from '@/Components/HeaderPopUp'

type Props = {}

const Highlights = ({auth}: PageProps) => {
  return (
    <>
        <Head title="Highlights" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                Highlight page
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Highlights