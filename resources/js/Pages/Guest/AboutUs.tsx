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
          <div className='min-h-screen max-w-7xl pt-4 w-full md:py-9 mx-auto px-4 sm:px-6 lg:px-8l flex flex-col space-y-10'>
            <div className='bg-black'>
              <p>At Idyllic, we are driven by a passion for make your wedding day extra special and unforgettable moment. Established 2023, we have been dedicated to design, plan, and unique. Our commitment to customers dream for any types of wedding venue has guided us on a journey to find the best way to make your dream wedding come true.</p>
            </div>

            <p className='mt-4'>Idyllic Wedding is more than just a business; we are a community of understanding, Innovative, Creative, Idealists and Futuristic people. We believe in putting an effort in ecerything will be enough to create a core memory for every bride and groom and aim to be the best experience of the bride and groom for their wedding day.</p>

          </div>
        </div>
          
        <Footer/>
    </>
  )
}

export default AboutUs