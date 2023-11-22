import { Head, usePage } from '@inertiajs/react'
import NavBar from './Partial/NavBar'
import { PageProps } from '@/types'
import Footer from './Partial/Footer'
import HeaderPopUp from '@/Components/HeaderPopUp'
import { IoLogoFacebook } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const AboutUs = ({auth}: PageProps) => {
  return (
    <>
        <Head title="About" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className='' style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
              backgroundImage: 'url(http://localhost:8000/wedding-bg.jpg)'
            }}>
              <div className='relative min-h-screen py-5 max-w-7xl md:py-9 mx-auto px-4 sm:px-6 lg:px-8l w-full flex flex-row justify-around mt-16'>
                <div className='relative ml-96 top-10 right-4 text-white p-11 rounded-2xl h-full w-full' style={{
                  height: "600px",
                  backgroundColor: "rgba(52,58,64,0.7)"}}>
                  <span className='text-8xl ml-20'>ABOUT US</span>
                    <div className='absolute left-72 top-40 p-8 mt-4 w-3/5 text-sm text-justify'>
                      <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</span>
                      
                    </div>
                    <div className='absolute bottom-5 left-30 flex gap-4'>
                      <span className='text-xs flex items-center'>Social Media Platform:</span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><IoLogoFacebook /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><FaYoutube /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><RiMessengerFill   /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><FaInstagram     /></span>
                    </div>
                </div>
                  <img className='absolute rounded-md top-60 left-12 h-80 w-2/5 mr-8' src="http://localhost:8000/about-1.jpg" alt=""/>
                  {/* <img className='absolute top-30 left-18 h-2/3 w-96 mr-8' src="http://localhost:8000/kap.jfif" alt=""/> */}
                  <img className='absolute rounded-md top-72 left-28 h-80 w-2/5 mr-8' src="http://localhost:8000/about-3.jpg" alt=""/>
              </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default AboutUs