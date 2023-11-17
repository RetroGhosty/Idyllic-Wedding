import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"
import NavBar from "./Partial/NavBar"
import Footer from "./Partial/Footer"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Img, Link } from "@chakra-ui/react"
import HeaderPopUp from "@/Components/HeaderPopUp"
import { IoPersonAdd } from "react-icons/io5";
import { IoIosPricetag } from "react-icons/io";


const Venues = ({auth, venues}: any) => {
  const navigate = (venue_name: string) => {
    router.get(route('venues.view_single', venue_name))
  }

  
  return (
    <>
        <Head title="Venues" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className='flex items-center px-4 sm:px-6 lg:px-8l w-full bg-[#a4ac86] h-24'>
                <div className="max-w-6xl mx-auto w-full text-3xl font-black tracking-widest">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={route('venues.home')}>Venues</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                </div>
            </div>
            <div className='min-h-screen w-full max-w-7xl py-5 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                <div className="flex flex-col space-y-6">
                  {venues.map((venue: any, id: number) => (
                    <div key={id} className="bg-[#eae2b7] md:bg-[#F4F3EE] rounded md:border-t-2 md:border-[#023047] select-none">
                      <div  onClick={() => navigate(venue['venue_name'])} className="md:hover:scale-105 overflow-hidden md:h-60 p-5 ease-out duration-300 relative flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start">
                        <div className="md:basis-1/2 relative overflow-hidden h-44 w-full md:h-full">
                          <Img src={`storage/${venue['photo_url']}`} className="w-full h-full object-cover"/>
                        </div>
                        <div className="w-full h-full flex flex-col justify-between">
                          <div>
                            <div>
                              <span className="text-xl font-bold z-1">{venue['venue_name']}</span>
                              <div className="flex flex-row space-x-5 justify-between">
                                <div className="flex flex-row space-x-5 mb-4">
                                  <div className="text-sm font-bold bg-[#219ebc] px-2 py-1 text-white rounded-lg flex flex-row space-x-2 items-center">
                                    <IoIosPricetag/>
                                    <span>Price: {venue['price']}</span>
                                  </div>
                                  <div className="text-sm font-bold bg-[#219ebc] px-2 py-1 text-white rounded-lg flex flex-row space-x-2 items-center">
                                    <IoPersonAdd/>
                                    <span>Capacity: {venue['limit']}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm overflow-hidden tracking-wide">
                              {venue['description'].length >= '400' 
                              ? 
                              <>
                              {`${venue['description'].slice(0, 400)}..... `}
                              <div className="text-[#219ebc] font-bold mt-1">[READ MORE]</div> 
                              </>

                              : 
                              venue['description']}</p>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}



export default Venues