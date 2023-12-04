import React from 'react'
import {useContext} from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { FaFacebookF } from 'react-icons/fa'
import { ThemeContext } from '@/Components/ContextApi/ThemeContext'

const Footer = () => {
    const {darkmode}=useContext(ThemeContext)
    
  return (
    <div className={`border-t border-gray-200 ${darkmode ? "dark text-slate-300":"light"}`}>
        <div className='max-w-7xl  mx-auto px-4 py-6  sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row justify-between h-32 md:h-14 text-sm'>
                <div className='flex flex-col space-y-2'>
                    <div className='flex flex-row space-x-2 items-center'>
                        <IoLocationSharp/>
                        <span>1117, Veterans Street, Quezon City</span>
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <FaFacebookF/>
                        <span>@IdyllicWeddingsOfficial</span>
                    </div>

                </div>
                <div className='flex flex-col space-y-2'>
                    <span>Copyright © Idyllic Weddings - Date and Venue Reservations</span>
                    <span>All Rights Reserved.</span>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Footer