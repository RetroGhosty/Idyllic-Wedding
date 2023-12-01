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
              <div className='md:flex'>
                
              <div className='relative min-h-screen py-5 max-w-7xl md:py-9 mx-auto px-4 sm:px-6 lg:px-8l w-full md:flex flex-row lg:shrink-0 justify-around mt-5'>
              
                <div className='relative md:ml-96 md:top-20 md:right-4 text-white p-11 rounded-2xl h-full w-full md:h-4/5 md:w-3/4' style={{
                  height: "600px",
                  backgroundColor: "rgba(52,58,64,0.7)"}}>
                    <div className='lg:text-4xl md:text-3xl md:ml-64 w-50 lg:mt-20 text-slate-300'>
                           <h1 className='text-slate-100'>ABOUT US</h1>
                             <div className='absolute text-sm py-12 pr-36 text-justify'>
                                <p>At Idyllic, we are driven by a passion for make your wedding day extra special and unforgettable moment. Established 2023, we have been dedicated to design, plan, and unique. Our commitment to customers dream for any types of wedding venue has guided us on a journey to find the best way to make your dream wedding come true.</p>
                                <p className='mt-4'>Idyllic Wedding is more than just a business; we are a community of understanding, Innovative, Creative, Idealists and Futuristic people. We believe in putting an effort in ecerything will be enough to create a core memory for every bride and groom and aim to be the best experience of the bride and groom for their wedding day.</p>
                             </div>
                    </div>
                    <div className='absolute bottom-5 right-20 flex gap-4'>
                      <span className='text-xs flex items-center'>Social Media Platform:</span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><IoLogoFacebook /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><FaYoutube /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><RiMessengerFill   /></span>
                      <span className=' text-3xl hover:text-red-500 cursor-pointer'><FaInstagram     /></span>
                    </div>
                </div>
                
                  <img className='absolute hidden md:block rounded-md top-60 left-12 h-80 w-2/5 mr-8 object-cover object-center' src="http://localhost:8000/about-1.jpg" alt=""/>
                  {/* <img className='absolute top-30 left-18 h-2/3 w-96 mr-8' src="http://localhost:8000/kap.jfif" alt=""/> */}
                  <img className='absolute hidden md:block rounded-md top-72 left-28 h-80 w-2/5 mr-8 object-fill' src="http://localhost:8000/about-3.jpg" alt=""/>
    
              </div>
              </div>
              
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default AboutUs