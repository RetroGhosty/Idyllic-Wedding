import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'
import HeaderPopUp from '@/Components/HeaderPopUp'
import {IoLogoFacebook } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { Transition } from '@headlessui/react'
import { useToast } from '@chakra-ui/react'

const Contact = ({auth}: PageProps) => {

  const {data, setData, errors, post, reset, recentlySuccessful} = useForm<any>({
    full_name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(route("contacts.makeInquiry"), {preserveScroll: true})
  }

  const toast = useToast()

  React.useEffect(() => {
    if(recentlySuccessful){
      reset()
      toast({
        title: "Successfully Sent",
        description: "Your inquiry has been sent",
        position: "bottom-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [recentlySuccessful])



  return (
    <>
        <Head title="Contact" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className=' relative'>
              <div className=' absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600'></div>
            <div className=' absolute inset-0 mix-blend-overlay' style={{
              background: "fixed",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              
              backgroundImage: 'url(http://localhost:8000/contact-2.jpg)'
            }}>
            </div>
            <div className='min-h-screen pt-4 md:py-9 mx-auto lg:px-8l space-y-5'>                            
                <div className=' relative h-[300px] md:h-[700px] flex items-center justify-center'>
                  <span className='text-3xl md:text-6xl text-white font-black'>Contact Us</span> 
                </div>
                <div className='relative bg-white top-0 md:top-10 h-[1000px] md:h-[800px] flex flex-col items-center p-10 md:p-20'>
                  <div>
                  <span className=' text-base md:text-3xl '>Let's Start a Conversation</span>
                  </div>
                  <div className='relative md:flex flex-col items-center md:flex-row gap-24 md:max-w-8xl md:max-h-80'>
                  <div className='flex flex-col gap-5 mt-5 md:mt-72'>
                    <span className='text-sm md:text-2xl'>How Can We Help You?</span>
                    <ul role='list' className='flex flex-col gap-5 text-xs md:text-base marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400'>
                      <li>Explore our stunning array of venues, from elegant ballrooms to scenic outdoor spaces.</li>
                      <li>Discuss available dates and flexible booking options to suit your schedule.</li>
                      <li>Discuss accommodation for guests.</li>
                      <li>Answer any queries or special requests.</li>
                    </ul>
                    <div className='relative flex flex-col mt-6'>
                    <label className='flex text-sm md:text-xl mb-5'>You Can Call Us or Visit Our Site:</label>
                    <ul className='flex flex-col gap-5 text-xs md:text-base list-disc pl-5 space-y-1 text-slate-400 mb-4'>
                      <li className='flex flex-row text-xs md:text-base'><FaPhone /><span>09123456789</span></li>                    
                      <li className='flex flex-row text-xs md:text-base'><FaLocationPin /><span>1117 Veterans Street Quezon City
, Philippines</span></li>                                      
                    </ul>
                      <label className='flex text-sm md:text-xl mb-5'>Visit Our Social Media Platform:</label>
                    <ul className='flex flex-row gap-10 md:gap-5 justify-center md:justify-start'>
                      <li><a href="#" className='text-3xl hover:text-red-500 cursor-pointer'><IoLogoFacebook /></a></li>
                      <li><a href="#" className='text-3xl hover:text-red-500 cursor-pointer'><FaYoutube /></a></li>
                      <li><a href="#" className='text-3xl hover:text-red-500 cursor-pointer'><FaInstagram /></a></li>
                    </ul>
                    </div>
                  </div>
                  <span className='flex justify-center md:hidden bg-gray-500 w-full h-1 mt-7 text-white'>.</span>
                  <form onSubmit={handleSubmit} className='relative -bottom-10 md:-bottom-28'>
                    <label className='flex text-sm md:text-2xl mb-3'>You Can Email Us:</label>
                    <div>
                      <span className="block text-sm md:text-md font-medium text-slate-700 p-1">Fullname</span>
                      <input type="text" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} placeholder='ex.Juan Dela Cruz' className='border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-full md:w-[500px] rounded-md' />
                       {errors.full_name ?
                       <div className='text-red-600'>
                         {errors.full_name}
                       </div>
                       : null}

                    </div>
                    <div>
                      <span className="block text-sm md:text-md font-medium text-slate-700 p-1">Email</span>
                      <input type="text" placeholder='ex.Juandelacruz@gmail.com' value={data.email} onChange={(e) => setData('email', e.target.value)} className='border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-full md:w-[500px] rounded-md' />
                       {errors.email ?
                       <div className='text-red-600'>
                         {errors.email ? errors.email : null}
                       </div>
                       : null}
                    </div>
                    <div>
                      <span className="block text-sm md:text-md font-medium text-slate-700 p-1">Message</span>
                      <input type="text" placeholder='Message' value={data.message} onChange={(e) => setData('message', e.target.value)} className='border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-full md:w-[500px] md:pb-[200px] rounded-md' />
                      {errors.message ?
                      <div className='text-red-600'>
                        {errors.message ? errors.message : null}
                      </div>
                      : null}
                    <button type="submit" className='absolute right-0 block bg-gray-900 hover:bg-gray-800 p-2 px-6 mt-2 rounded-md text-white'>Send</button>
                    </div>

                  </form>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Contact