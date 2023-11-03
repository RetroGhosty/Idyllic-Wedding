import React from 'react'
import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/react'
import { PageProps } from '@/types'

const NavBar = ({user}: any) => {
  return (
    <nav className="bg-slate-100 border-b border-gray-200">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 md:h-32">
                <div className="flex">
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className='text-sm'>
                            <img src={`/icon.svg`} alt="idylic logo" className='object-fit h-auto w-10 md:w-24'/>
                        </Link>
                    </div>
                </div>
                {user ?
                <>
                <div className='flex space-x-reverse'>
                        <ul className="hidden space-x-12 sm:-my-px sm:ml-10 sm:flex text-xl">

                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('landing-page')} active={route().current('landing-page')}>HOME</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('about.home')} active={route().current('about.*')}>ABOUT US</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('highlights.home')} active={route().current('highlights.*')}>HIGHLIGHTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('venues.home')} active={route().current('venues.*')}>VENUES</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('contacts.home')} active={route().current('contacts.*')}>CONTACTS</NavLink>
                        </ul>
                </div>
                <div className='flex space-x-reverse'>

                    <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('dashboard')} active={route().current('register')}>
                        DASHBOARD
                    </NavLink>
                </div>
                </>
                : 
                <>
                <div className='flex space-x-reverse'>
                        <ul className="hidden space-x-12 sm:-my-px sm:ml-10 sm:flex text-xl">

                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('landing-page')} active={route().current('landing-page')}>HOME</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('about.home')} active={route().current('about.*')}>ABOUT US</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('highlights.home')} active={route().current('highlights.*')}>HIGHLIGHTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('venues.home')} active={route().current('venues.*')}>VENUES</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('contacts.home')} active={route().current('contacts.*')}>CONTACTS</NavLink>
                        </ul>
                </div>
                <div className='flex space-x-reverse'>
                    <NavLink className='text-black sm:flex sm:text-sm md:text-base' href={route('booking.home')} active={route().current('booking.*')}>BOOK NOW</NavLink>
                </div>     
                </>           
                }
            </div>
        </div>  
    </nav>
  )
}

export default NavBar