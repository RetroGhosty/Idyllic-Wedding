import React from 'react'
import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/react'

const NavBar = () => {
  return (
    <nav className="bg-zinc-900 border-b border-gray-200 text-white">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-10 md:h-16">
                <div className="flex">
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className='text-sm'>
                            Idyllic Wedding
                        </Link>
                    </div>
                </div>
                <div className='flex space-x-reverse'>
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <NavLink className='text-slate-400 hover:text-white' href={route('login')} active={route().current('login')}>
                            Login
                        </NavLink>
                    </div>
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <NavLink className='text-slate-400 hover:text-white' href={route('register')} active={route().current('register')}>
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>  
    </nav>
  )
}

export default NavBar