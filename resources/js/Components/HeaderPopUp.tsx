import { Box, Button, CloseButton, Collapse, Slide, useDisclosure } from "@chakra-ui/react"
import PrimaryButton from "./PrimaryButton"
import { router, usePage } from "@inertiajs/react"
import React from "react"

const HeaderPopUp = () => {
    const {latestTransaction} = usePage().props
    const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
    React.useEffect(() => {
        if(latestTransaction !== null){
            onOpen()
        }
    }, [latestTransaction])
  return (
    <>
        <Collapse in={isOpen} animateOpacity>
            <Box className="flex items-center px-4 sm:px-6 lg:px-8l w-full bg-[#092327] text-white h-12 md:h-24">
                <div className="max-w-6xl mx-auto w-full text-xl md:text-3xl font-black tracking-widest ease-in-out text-center relative ">
                    <span className="hover:bg-[#0b5351] select-none rounded p-4" onClick={() => router.get(route('booking.customerViewBooking', latestTransaction as string))}>
                        View booked venue
                    </span>
                </div>
                <CloseButton type='button' className="absolute right-5 top-3 z-10" onClick={onClose}/>
            </Box>
        </Collapse>
    </>
  )
}

export default HeaderPopUp