import PrimaryButton from '@/Components/PrimaryButton';
import { backendUrl } from '@/Helper/Backendhelper';
import React from 'react'
import Slider from 'react-slick'
import "./slick-theme.css"
import "./slick.css"; 
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { motion } from 'framer-motion';
import { FaCity } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { router } from '@inertiajs/react';






const CarouselComponent = ({theme_name, venues, theme}: any) => {
    const sliderRef = React.useRef<any>()
    const settings = {
    ref: sliderRef,
    dots: true,
    speed: 500,
    arrows: true,
    }
    const goNext = () => {
    sliderRef.current.slickNext()
    }
    const goPrev = () => {
    sliderRef.current.slickPrev()
    }
    // End of carousel config
    if (theme.length === 0) return (
    <>
        Loading
    </>
    )
    const countCategorizedVenues = (eachTheme: string, venues: any) => {
        let count = 0
        venues.forEach((venue: any, index: number) => {
          if (eachTheme === venue['theme_name']) count++
        })
        if (count >= 3){
          return true 
        } else{
          return false
        }
    }
    const imageVariant = {
        hidden: {scale: 1.3},
        hover: {scale: 1.08, transition:{duration: 1.5, type: "spring", bounce: 0}},
    }
    const itemVariants = {
        hidden: { opacity: 0, bottom: "-100%" },
        hover: { opacity: 1, bottom: 0,
            transition: {
                duration: 0.3,
            } },
    }

    // TEST FUNCTIOn
    // const itemVariants = {
    //     hidden: { opacity: 1, },
    //     hover: { opacity: 1, bottom: 0,
    //         transition: {
    //             duration: 0.3,
    //         } },
    // }
    const navigate = (venue_name: string) => {
        router.get(route('venues.view_single', venue_name))
    }

  return (
    <div className='flex flex-col space-y-2'>
        <Slider 
        slidesToShow={countCategorizedVenues(theme_name, venues) ? 2 : 1} infinite={countCategorizedVenues(theme_name, venues)} 
        {...settings}>
            {venues.map((venue: any, subIndex: number) => (
                theme_name === venue['theme_name'] ? (
                    <div key={subIndex} className="relative h-[300px] w-full overflow-hidden">
                        <motion.div onClick={() => navigate(venue['venue_name'])} whileHover="hover" initial="hidden" className="bg-slate-200 m-4 h-full relative overflow-hidden">
                            <motion.img variants={imageVariant} className="object-cover object-bottom w-full h-full absolute top-0 -z-1" src={`${backendUrl}/storage/${venue['photo_url']}`}/>
                            <div className='absolute z-10 top-0 right-0 flex flex-row m-2 space-x-1 text-[1.05rem]'>
                                <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-out text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                    <span>{`₱ ${venue['price']}.00`}</span>
                                    
                                </div>
                                <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-out text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                    <FaUsers/>
                                    <span>{`${venue['limit']}`}</span>
                                </div>
                                <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-outs text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                    <FaCity/>
                                    <span>{venue['place_name']}</span>
                                </div>
                            </div>
                            <motion.div variants={itemVariants} className='absolute bottom-0 bg-[#212529d0] text-white w-full h-[55%]'>  
                                <div className="absolute z-10 flex flex-col p-5">
                                    <h2 className='font-black text-lg text-[#e56b6f]'>{venue['venue_name']}</h2>
                                    <p className="text-sm overflow-hidden tracking-wide">
                                        {venue['description'].length >= '400' 
                                        ? 
                                        <>
                                        {`${venue['description'].slice(0, 400)}..... `}
                                        <div className="text-[#219ebc] font-bold mt-1">[READ MORE]</div> 
                                        </>
                                        : 
                                        venue['description']}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
            ) : null
            ))}
        </Slider>
        <div className='w-full flex flex-row justify-end space-x-2 px-4 text-md'>
            <motion.div whileHover={{backgroundColor: "#fb8500", scale:1.1}} whileTap={{ scale: 0.9 }} className='py-1 px-3 select-none' onClick={() => goPrev()}>
                <GrPrevious />
            </motion.div>
            <motion.div whileHover={{backgroundColor: "#fb8500", scale:1.2}} whileTap={{ scale: 0.9 }}  className='py-1 px-3 select-none' onClick={() => goNext()}>
                <GrNext />
            </motion.div>
        </div>
    </div>
  )
}

export default CarouselComponent