import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CircularProgress, CloseButton, Select, useDisclosure } from '@chakra-ui/react'
import { router, useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { add, addDays, addMonths, format, parse, subDays } from 'date-fns'
import DatePicker from "react-datepicker";
import "../../../../css/react-datepicker.css"
import { FaArrowLeft } from "react-icons/fa";
import { ClearProgressReload, CreateProgressReload } from './FormHelper/ProgressHelper'




const VenueBookingForm = ({venues, increaseStep, decreaseStep, transactions, session}:any) => {
    const {data, setData, errors, setError, clearErrors} = useForm<any>({
        user_id: session ? session['id'] : undefined,
        venue_id: 0,
        dateSelected: null,
    })

    const [reloadState, setReloadState] = React.useState(false)

    const changeExcludedDates = () => {
      transactions.map((transaction: any) => {
        if (venues.length === 0){
          return false
        }

        if (transaction['venue_id'] === venues[data.venue_id]['id']){
          const initialDate = parse(transaction['event_date'], 'yyyy-MM-dd', new Date())
          const startDate = subDays(initialDate, 7)
          const endDate = initialDate
          excludedDates.push({start: startDate, end: endDate})
        }
      })
    }
    const excludedDates: any[] = []
    const [currentVenue, setCurrentVenue] = React.useState(0)
    const handleVenueChange = (e: any) => {
      setData('venue_id', e.target.value)
      setCurrentVenue(e.target.value)
      changeExcludedDates()
    }
    const dateChange = (date) => {
      setData('dateSelected', date)
    }
    changeExcludedDates()
  
    const handleSubmit = (e: any) => {
      e.preventDefault()
      const payload = {
        'user_id': session['id'],
        'venue_id': venues[currentVenue]['id'] || venues[0]['id'],
        'dateSelected': format(data['dateSelected'], 'yyyy-MM-dd')

      }
      router.post(route('booking.BookingPaymentSession'), payload, {
        preserveScroll: true,
        onSuccess: () => {
          increaseStep()
        },
        onError: (error: any) => {
          setError(error)
        },
        onStart: () => {CreateProgressReload(setReloadState), clearErrors()},
        onFinish: () => {ClearProgressReload(setReloadState)},

      })
    }

  
    const { isOpen: isVisible, isOpen, onClose, onOpen } = useDisclosure({defaultIsOpen: false})
    React.useEffect(() => {
      if (errors['api_status'] !== undefined){
        onOpen()
      }
    }, [errors])
    

  return (
    <AnimatePresence>
      
      <motion.form onSubmit={handleSubmit} className='flex flex-col space-y-7 my-4'
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      >

          {isVisible ? 
          <Alert status='error'>
            <AlertIcon/>
            <Box className='w-full'>
              <AlertTitle>Booking Unsuccessful</AlertTitle>
              <AlertDescription>{errors['api_status']}</AlertDescription>
            </Box>
            <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={onClose}></CloseButton>
          </Alert>
          : null}
          <div className='flex flex-col'>
              <InputLabel htmlFor="venue_id" value='Venue'/> 
              <Select autoComplete="off" id='venue_id' value={data.venue_id} onChange={handleVenueChange}>
                  {venues.map((venue: any, index: number) => (
                    <option key={index} value={index}>{venue['venue_name']}</option>
                    ))}
              </Select>
              {errors.venue_id ? errors.venue_id : null}
          </div>              
          <div className='flex flex-col space-y-4'>
            <div>
              <InputLabel htmlFor="datePicker" value='Booking'/> 
              <span className='text-xl font-black'>
                  <DatePicker 
                  id='datePicker'
                  onChange={dateChange}
                  minDate={addDays(new Date(), 3)}
                  maxDate={addMonths(new Date(), 3)}
                  excludeDateIntervals={excludedDates}
                  selected={data['dateSelected']}
                  />
              </span>
            </div>
            {errors.dateSelected ? errors.dateSelected : null}
            <div>
              {venues.length !== 0 ? 
              <>
                <span className='text-xl font-black'>Details</span>
                <div className='text-base'>Limit: {venues[currentVenue]['limit']}</div>
                <div className='text-base'>Price: P{venues[currentVenue]['price']}.00</div>
              </>
              : 
              <>
                <span className='text-xl font-black'>No venue</span>
              </>
              }
            </div>
            <div className='flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:items-center'>
                <div className='flex flex-row space-x-4 text-red-700 font-black hover:scale-105 transition ease-in-out select-none' onClick={() => {decreaseStep()}}>
                  <FaArrowLeft className="text-xl"/>
                  <span>Return to step 2</span>
                </div>
                
                <div className='flex md:flex-row space-x-4 items-center'>
                  <PrimaryButton type='submit' disabled={reloadState ? true : false} className='md:order-last md:ms-3'>Next</PrimaryButton>
                  {reloadState ? <CircularProgress isIndeterminate color='blue.700' size="20px"/> : null}
                </div>
            </div>
          </div>
      </motion.form>
    </AnimatePresence>
  )
}

export default VenueBookingForm