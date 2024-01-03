import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavBar from './Guest/Partial/NavBar';
import Footer from './Guest/Partial/Footer';
import HeaderPopUp from '@/Components/HeaderPopUp';
import { FaFacebookSquare,  } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { motion } from 'framer-motion';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { backendUrl } from '@/Helper/Backendhelper';




export default function Welcome({ auth, venues }: any) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <HeaderPopUp/>
                <NavBar user={auth.user} backgroundColor="#5000"/>
           
                <div className='min-h-screen overflow-hidden relative w-full'>
                    <div className='relative w-full h-[400px] md:h-[100vh] xl:h-[800px]'>
                        <div className='mix-blend-multiply'>
                            <img src={`${backendUrl}/hero-image.png`} className='pointer-events-none absolute z-5 h-full w-full object-cover' loading='lazy'/>
                        </div>

                        <div className='grid grid-cols-3 grid-row-3 gap-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8l relative'>
                            <div className='flex flex-col space-y-3 md:space-y-5 col-span-3 md:col-span-2 grid-rows-3 justify-center items-center md:items-start relative z-10'>
                                <div className='flex flex-col items-center md:items-start text-center md:text-start'>
                                    <p className='text-[14px] md:text-[1.2rem] text-[#35383a] w-[90%]'>Your idyllic love story begins here. Discover enchanting venues and seamless planning for your special day.</p>
                                    <h1 className='text-4xl md:text-7xl tracking-widest text-black font-black'>Idyllic Weddings</h1>
                                </div>
                                <button type='button' className='bg-[#ffffff] text-base md:text-xl px-8 py-1 md:px-12 md:py-2 font-black text-black' 
                                onClick={() => router.get(route('booking.home'))}
                                >
                                    Book now
                                </button>

                            </div>
                            
                        </div>
                    </div>
                    <div className='text-black relative z-20'>
                        <div className='max-w-7xl py-4 md:py-12 mx-auto px-4 sm:px-6 lg:px-8l'>
                            <div className='relative grid grid-cols-1 mb-5 md:mb-0 md:grid-cols-2 w=full min-h-[20vh] gap-10'>
                                <div className='flex flex-col justify-between space-y-5'>
                                    <div className='bg-[#463f3a] p-8 rounded-xl text-white'>
                                        <h1 className='text-base md:text-2xl tracking-widest'>Romantic Setting</h1>
                                        <p>Exchange vows in a picturesque venue surrounded by lush landscapes and blooming flowers. Our idyllic wedding reservation ensures a romantic atmosphere that will make your special day truly unforgettable.</p>
                                    </div>
                                    <div className='bg-[#463f3a] p-8 rounded-xl text-white'>
                                        <h1 className='text-base md:text-2xl  tracking-widest'>Effortless Planning</h1>
                                        <p>Simplify your wedding preparations with our efficient services. From organizing the ceremony to coordinating with vendors, we handle the details, allowing you to focus on the joy of the occasion. Enjoy a stress-free journey to your dream wedding!</p>
                                    </div>
                                    <div className='bg-[#463f3a] p-8 rounded-xl text-white'>
                                        <h1 className='text-base md:text-2xl  tracking-widest'>Seamless Experience</h1>
                                        <p>Experience a seamless and delightful wedding celebration with our meticulous attention to detail. Our team is dedicated to ensuring every moment of your special day flows smoothly, creating cherished memories that last a lifetime.</p>
                                    </div>
                                </div>
                                <div className='hidden md:flex flex-col justify-center items-center w-full h-full'>
                                    <div className='relative flex aspect-square w-[350px]'>
                                        <img className='absolute bottom-10 right-10 aspect-square h-full z-10 rounded' src={`${backendUrl}/image1.png`} loading='lazy'/>
                                        <div className='relative top-10 left-10 aspect-square h-full z-10'>
                                            <img className='absolute rounded' src={`${backendUrl}/image2.png`} loading='lazy'/>
                                            <div className='absolute rounded bg-white -z-[1] bottom-2 right-2 w-full h-full'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='max-w-7xl py-4 md:py-12 mx-auto px-4 sm:px-6 lg:px-8l'>
                            <h1 className='text-xl md:text-4xl font-bold mb-6'>Available Venues</h1>
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={2500}
                                autoPlay={true}
                                containerClass="container-with-dots min-h-[400px]"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass="select-none"
                                keyBoardControl
                                minimumTouchDrag={80}
                                pauseOnHover
                                renderArrowsWhenDisabled={false}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                showDots={true}
                                responsive={responsive}>

                                {venues.map((venue: any, index: number) => (
                                    <div key={index} className='rounded w-full h-[400px] p-6'>
                                        <div  onClick={() => {router.get(route('venues.view_single', venue['venue_name']))}} className='text-white w-full h-full flex items-center justify-center relative'>
                                            <img className='object-cover w-full h-full rounded-lg' src={`http://localhost:8000/storage/${venue['photo_url']}`} loading='lazy'/>
                                            <motion.div initial={{opacity:0, backgroundColor: 'black'}} whileHover={{opacity: 0.7}} className='absolute h-full w-full bg-opacity-10 rounded-lg flex items-center justify-center'>
                                                <div className='text-2xl'>
                                                    {venue['venue_name']}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                
                                ))}
                            </Carousel>;
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}
