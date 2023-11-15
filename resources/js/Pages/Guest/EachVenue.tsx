import { Head } from "@inertiajs/react"
import NavBar from "./Partial/NavBar"
import Footer from "./Partial/Footer"
import {MdReduceCapacity} from 'react-icons/md'
import {GiMoneyStack} from 'react-icons/gi'
import { Image } from "@chakra-ui/react"
import HeaderPopUp from "@/Components/HeaderPopUp"

const EachVenue = ({auth, venue, landing_photo, showcase_photo}: any) => {
    
  return (
    <>
        <Head title={`${venue['venue_name']} Venue`} />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            <div className='w-full h-96' style={{backgroundImage: `url(/storage/${landing_photo['photo_url']})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}/>        
            <div className='flex items-center px-4 sm:px-6 lg:px-8l w-full bg-[#a4ac86] h-24 sticky top-0'>
                <div className="max-w-7xl mx-auto w-full text-3xl font-bold tracking-widest">
                    {`${venue['venue_name']} Venue`}
                </div>
            </div>
            <div className='min-h-screen  w-full max-w-7xl py-5 md:py-9 mx-auto px-4 space-y-12 sm:px-6 lg:px-8l'>
                <p>{venue['description']}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-0 md:space-x-10 text-white">
                    <div className="bg-[#333533] p-8 flex flex-col items-center space-y-5">
                        <span className="text-9xl"><GiMoneyStack/></span>
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-black tracking-widest">Price</div>
                            <div className="text-xl">{venue['price']}</div>
                        </div>
                    </div>
                    <div className="bg-[#333533] p-8 flex flex-col items-center space-y-5">
                        <span className="text-9xl"><MdReduceCapacity/> </span>
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-black tracking-widest">Capacity</div>
                            <div className="text-xl">{venue['limit']}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="text-3xl tracking-widest font-black">Highlights</span>
                    <div className="columns-1 md:columns-3 md:gap-5 mt-5">
                        {showcase_photo.map((photo: any, index: number) => (
                            <Image key={index} className="w-full my-5" src={`/storage/${photo['photo_url']}`}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default EachVenue