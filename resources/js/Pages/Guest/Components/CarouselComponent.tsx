import PrimaryButton from '@/Components/PrimaryButton';
import { backendUrl } from '@/Helper/Backendhelper';
import React from 'react'
import Slider from 'react-slick'
import "./slick-theme.css"
import "./slick.css"; 
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { motion } from 'framer-motion';




const CarouselComponent = ({theme_name, venues, theme}: any) => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style,  cursor: "pointer", background: "red" }}
            onClick={onClick}
            />
        );
        }
    function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style,  cursor: "pointer", background: "green", position: "absolute", top: "", left: "-20px" }}
        onClick={onClick}
        />
    );
    }


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
  return (
    <div className='flex flex-col space-y-2'>
        <Slider 
        slidesToShow={countCategorizedVenues(theme_name, venues) ? 3 : 1} infinite={countCategorizedVenues(theme_name, venues)} 
        {...settings}>
            {venues.map((venue: any, subIndex: number) => (
                theme_name === venue['theme_name'] ? (
                    <div key={subIndex} className="relative h-[200px] w-full">
                    <div className="bg-slate-200 m-4 h-full relative">
                    <div className="absolute z-10">{venue['venue_name']}</div>
                    <img className="object-cover object-bottom w-full h-full absolute top-0 -z-1" src={`${backendUrl}/storage/${venue['photo_url']}`}/>
                    <div className='absolute bottom-0 bg-black w-full h-[60%]'>lmao</div>
                    </div>
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