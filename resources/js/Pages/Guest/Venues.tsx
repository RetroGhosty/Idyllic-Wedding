import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"
import NavBar from "./Partial/NavBar"
import Footer from "./Partial/Footer"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Img, Link } from "@chakra-ui/react"
import HeaderPopUp from "@/Components/HeaderPopUp"
import { IoPersonAdd } from "react-icons/io5";
import { IoIosPricetag } from "react-icons/io";
import Slider from "react-slick"
import React from "react"
import { backendUrl } from "@/Helper/Backendhelper"
import CarouselComponent from "./Components/CarouselComponent"

const Venues = ({auth, venues}: any) => {
  const navigate = (venue_name: string) => {
    router.get(route('venues.view_single', venue_name))
  }

  // Carousel config
  const [theme, setTheme] = React.useState<any>([])
  React.useEffect(() => {
    setTheme([])
    let localTheme: any = []
    venues.forEach((venue: any, index: number) => {
      let isExist = false
      localTheme.forEach((eachLocalTheme: any, subIndex: number) => {
        if (eachLocalTheme['theme_name'] === venue['theme_name']) isExist = true
      })
      if (!isExist){
        localTheme.push({
          theme_name: venue['theme_name'],
          theme_cover: venue['theme_cover'],
        })
      }
    })
    
    return setTheme(localTheme)
  }, [])


  return (
    <>
        <Head title="Venues" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            <HeaderPopUp/>
            <NavBar user={auth.user}/>
            

            <div className='min-h-screen w-full max-w-7xl py-5 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                <div className="flex flex-col space-y-10">
                  {theme.map((eachTheme: any, index: number) => (
                    <div key={index} className="relative overflow-hidden shadow-lg">
                      <div className="p-6 rounded-xl">
                        <CarouselComponent theme_name={eachTheme['theme_name']} venues={venues} theme={theme}/>
                      </div>
                      <div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-30% from-[#edede9] z-[11]"/>
                        <div className="h-[100%] w-[70%] absolute bottom-0 right-0 z-10">
                          <img className="object-cover object-center  aspect-video" src={`${backendUrl}/storage/${eachTheme['theme_cover']}`}/>
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