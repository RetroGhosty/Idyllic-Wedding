import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from '../Guest/Partial/NavBar'
import Footer from '../Guest/Partial/Footer'
import { add, differenceInDays, intervalToDuration, format, parse } from 'date-fns'

const ViewBooking = ({auth, transaction, venue, landing_photo}: any) => {
    const eventDate = new Date(transaction['event_date'])

    const [approximateDate, setApproximateDate] = React.useState(intervalToDuration({start: new Date(), end: eventDate}))
    React.useEffect(()=> {
        const timer = setInterval(() => {
            setApproximateDate(intervalToDuration({start: new Date(), end: eventDate}))
        }, 1000)
        return () => clearInterval(timer)
    }, [new Date()])
  return (
    <>
        <Head title="Booking details" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            <NavBar user={auth.user}/>
            <div className='flex items-center px-4 sm:px-6 lg:px-8l w-full bg-[#a4ac86] h-16 md:h-32'>
                <div className="max-w-6xl mx-auto w-full text-xl md:text-3xl font-black tracking-widest text-center">
                    Thank you for booking in us!
                </div>
            </div>
            <div className='flex items-center px-4 sm:px-6 lg:px-8l w-full bg-[#e07145] h-16 md:h-24'>
                <div className="max-w-6xl mx-auto w-full text-xl md:text-3xl font-black tracking-widest text-center">
                    {`${approximateDate.days} days, ${approximateDate.hours} hours, ${approximateDate.minutes} minutes left before the wedding event`}
                </div>
            </div>
            <div className='min-h-screen items-center max-w-7xl py-4 w-full md:py-9 mx-auto px-4 sm:px-6 lg:px-8l flex flex-col space-y-12'>
                <div className='flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-12 w-full items-center justify-center'>
                    <div className='md:flex rounded w-full relative'>
                        <div className='bg-[#31572c] hidden md:flex w-full h-full bottom-3 rounded right-3 absolute z-0'/>
                        <img src={`/storage/${landing_photo}`} className='rounded object-cover z-10'/> 
                    </div>
                    <div className='bg-[#2A2A2A] w-full text-white p-7 rounded basis-1/2'>
                        <h1 className='md:text-3xl font-bold mb-2 md:mb-3'>{venue['venue_name']} Venue</h1>
                        <div className='mb-2 md:mb-3'>
                            <h1 className='text-base md:text-xl md:font-bold'>Capacity: {venue['limit']}</h1>
                            <h1 className='md:text-xl md:font-bold'>Price: {venue['price']}</h1>
                        </div>
                        <p>
                           {venue['description']}
                        </p>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-12 w-full items-center justify-center bg-[#f7b1b1] p-7'>
                    <div className='rounded w-full relative'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between md:mb-3'>
                            <span className='text-3xl font-black '>Booking details</span>
                            <span className='font-black'> Reference ID: {transaction['id']}</span>

                        </div>
                        <ul className='text-2xl'>
                            <li className='flex flex-col md:flex-row md:space-x-3'>
                                <span>Event on: </span>
                                <span className='font-black'>
                                    {format(parse(transaction['event_date'], 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')}
                                </span>
                            </li>
                            <li className='flex flex-col md:flex-row md:space-x-3'>
                                <span>Payment Method:</span>
                                <span className='font-black'>
                                    {transaction['payment_method']}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default ViewBooking