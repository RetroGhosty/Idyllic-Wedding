import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"
import NavBar from "./Partial/NavBar"
import Footer from "./Partial/Footer"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Img, Link } from "@chakra-ui/react"


const Venues = ({auth, venues}: any) => {
  const navigate = (venue_name: string) => {
    router.get(route('venues.view_single', venue_name))
  }
  return (
    <>
        <Head title="Venues" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
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
            <div className='min-h-screen max-w-7xl py-5 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[3rem]">
                  {venues.map((venue: any, id: number) => (
                    <div key={id} onClick={() => navigate(venue['venue_name'])} className="border-4 border-[#4c601b] hover:scale-105 p-5 ease-out duration-300 relative">
                      <span className="text-2xl font-bold z-1">{venue['venue_name']}</span>
                      <p className="text-sm">{venue['description']}</p>
                      <div className="text-sm font-bold">Capacity: {venue['limit']}</div>
                      <Img src={`storage/${venue['photo_url']}`} alt={venue['venue_name']}/>
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