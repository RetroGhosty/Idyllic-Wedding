import React from 'react'
import { useState, useEffect } from 'react'
import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import HeaderPopUp from '@/Components/HeaderPopUp'
import PhoneNavLink from '@/Components/PhoneNavLink'

const NavBar = ({user, backgroundColor}: any) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [scroll, setScroll] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);



  return (
    <>
    <nav className={backgroundColor !== undefined ? `${backgroundColor} border-b border-gray-200` : 'bg-slate-100 border-b -border-gray-200'}>
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 fixed z-50 ${scroll && "shadow-xl bg-slate-100 ease-in duration-500"}`}>
            <div className="flex pl-44 pr-44 justify-between items-center h-14 md:h-24">
                <div className="flex">
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className='text-sm'>
                            <img src={`/icon.svg`} alt="idylic logo" className='object-fit h-auto w-12 md:w-24'/>
                        </Link>
                    </div>
                </div>
                {user ?
                <>
                <div className='flex space-x-reverse'>
                        <ul className="hidden space-x-12 sm:-my-px sm:ml-10 md:flex text-2xl">
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('landing-page')} active={route().current('landing-page')}>HOME</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('highlights.home')} active={route().current('highlights.*')}>HIGHLIGHTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('venues.home')} active={route().current('venues.*')}>VENUES</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('contacts.home')} active={route().current('contacts.*')}>CONTACTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('about.home')} active={route().current('about.*')}>ABOUT US</NavLink>
                        </ul>
                </div>
                <div className='hidden md:flex space-x-reverse'>
                    <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('dashboard')} active={route().current('register')}>
                        DASHBOARD
                    </NavLink>
                </div>
                <div className='flex md:hidden'>
                    <Button colorScheme='teal' onClick={onOpen}>
                        <GiHamburgerMenu />
                    </Button>     
                </div>
                </>
                : 
                <>
                <div className='flex space-x-reverse'>
                        <ul className="hidden space-x-12 sm:-my-px sm:ml-10 md:flex text-xl">
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('landing-page')} active={route().current('landing-page')}>HOME</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('highlights.home')} active={route().current('highlights.*')}>HIGHLIGHTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('venues.home')} active={route().current('venues.*')}>VENUES</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('contacts.home')} active={route().current('contacts.*')}>CONTACTS</NavLink>
                            <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('about.home')} active={route().current('about.*')}>ABOUT US</NavLink>
                        </ul>
                </div>
                <div className='hidden md:flex space-x-reverse'>
                    <NavLink className='text-black sm:flex sm:text-sm md:text-sm' href={route('booking.home')} active={route().current('booking.*')}>BOOK NOW</NavLink>
                </div>
                <div className='flex md:hidden'>
                    <Button colorScheme='teal' onClick={onOpen}>
                        <GiHamburgerMenu />
                    </Button>  
                </div>
                </>           
                }
            </div>
        </div>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader>        
                    {user ? 
                    <PhoneNavLink className='text-black sm:flex sm:text-sm md:text-sm border-b-0' href={route('dashboard')} active={route().current('register')}>
                        DASHBOARD
                    </PhoneNavLink>

                    : 
                    <PhoneNavLink className='text-black sm:flex sm:text-sm md:text-base border-b-0' href={route('booking.home')} active={route().current('booking.*')}>Book Now</PhoneNavLink>
                    
                    }            
                </DrawerHeader>
                <DrawerBody className='flex flex-col space-y-3'>
                    <PhoneNavLink className='text-black border-b-0' href={route('landing-page')} active={route().current('landing-page')}>Home</PhoneNavLink>
                    <PhoneNavLink className='text-black border-b-0' href={route('about.home')} active={route().current('about.*')}>About us</PhoneNavLink>
                    <PhoneNavLink className='text-black border-b-0' href={route('highlights.home')} active={route().current('highlights.*')}>Highlights</PhoneNavLink>
                    <PhoneNavLink className='text-black border-b-0' href={route('venues.home')} active={route().current('venues.*')}>Venues</PhoneNavLink>
                    <PhoneNavLink className='text-black border-b-0' href={route('contacts.home')} active={route().current('contacts.*')}>Contacts</PhoneNavLink>
                </DrawerBody>
                <DrawerFooter>
                    @ Idyllic Weddings
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    </nav>
    </>
  )
}

export default NavBar