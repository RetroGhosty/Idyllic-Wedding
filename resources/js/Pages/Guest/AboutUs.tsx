import { Head, usePage } from '@inertiajs/react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'
import HeaderPopUp from '@/Components/HeaderPopUp'

const AboutUs = ({auth}: PageProps) => {
  return (
    <>
        <Head title="About" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <HeaderPopUp/>
            <NavBar user={auth.user}/>  
            <div className='min-h-screen py-5 max-w-7xl md:py-9 mx-auto px-4 sm:px-6 lg:px-8l w-full'>
              <img src="http://localhost:8000/kap.jfif" alt=""/>
              <div className='rounded-md p-5 bg-black/[.4] min-h-screen flex flex-col items-center '>
                  <div>
                    <span className='font-bold text-2xl'>Welcome to</span>
                  </div>
                  <div>
                    
                  </div>
              </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default AboutUs