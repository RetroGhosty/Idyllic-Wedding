import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'
import HeaderPopUp from '@/Components/HeaderPopUp'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


type Props = {}

const Highlights = ({auth, highlightPhotos}: any) => {
  return (
    <>
        <Head title="Highlights" />
        
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className='relative'>
            <div className=' absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600'></div>
            <div className=' absolute inset-0 mix-blend-overlay' style={{
              background: "fixed",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              
              backgroundImage: 'url(http://localhost:8000/wedding-bg3.jpg)'
            }}>
            </div>
            <div className='relative min-h-screen w-full max-w-7xl pt-4 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
              <div className=' relative h-[100px] md:h-[200px] flex items-center justify-center'>
                <span className='text-white text-3xl font-black uppercase'>Welcome to Idyllic Wedding Venue Gallery</span>
              </div>
                <div className='columns-2 md:columns-4 md:gap-1 mt-5 items-start'>
                  {highlightPhotos.map((photo: any, index: number) => (
                    <img key={index} className='w-full mb-1 border-solid border-2 border-gray-500' src={`/storage/${photo['photo_url']}`}/>
                    ))}
                  </div>
                  </div>   
              </div>
            <Footer/>
        </div>
    </>
  )
}

export default Highlights