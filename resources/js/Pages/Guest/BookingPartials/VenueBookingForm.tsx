import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Select, useDisclosure } from '@chakra-ui/react'
import { router, useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { add, addDays, addMonths, format, parse } from 'date-fns'
import DatePicker from "react-datepicker";
import "../../../../css/react-datepicker.css"

const VenueBookingForm = ({venues, increaseStep, decreaseStep, transactions, session}:any) => {

    const {data, setData, errors, setError} = useForm<any>({
        user_id: session['id'],
        venue_id: 0,
        dateSelected: addDays(new Date(), 4),
    })
    const changeExcludedDates = () => {
<<<<<<< HEAD
      transactions.map((transaction: any) => {
        if (venues.length === 0){
          return false
        }
        if (transaction['venue_id'] === venues[data.venue_id]['id']){
          excludedDates.push(parse(transaction['event_date'], 'yyyy-MM-dd', new Date()))
        }
      })
=======
      if (reservations['venue_id'] !== undefined && venues !== null){
        debugger;
        reservations.map((reservation: any) => {
          if (reservation['venue_id'] === venues[data.venue_id]['id']){
            excludedDates.push(parse(reservation['event_date'], 'yyyy-MM-dd', new Date()))
          }
        })
      }
>>>>>>> 0f7aa259078b4966cfc587d3f22bc4838b4dad35
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
        'dateSelected': data['dateSelected']

      }
      router.post(route('booking.BookingPaymentSession'), payload, {
        preserveScroll: true,
        onSuccess: () => {
          increaseStep()
        },
        onError: (error: any) => {
          setError(error)
        }
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
      
      <motion.form onSubmit={handleSubmit} className='flex flex-col space-y-7'
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      >
          <div className='font-black text-2xl'>Venue Booking</div>
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
              <span className='text-xl font-black'>
                  <DatePicker 
                  id='datePicker'
                  onChange={dateChange}
                  minDate={addDays(new Date(), 3)}
                  maxDate={addMonths(new Date(), 3)}
                  excludeDates={excludedDates}
                  selected={data['dateSelected']}
                  />
              </span>
            </div>
            <div>
<<<<<<< HEAD
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
=======
              <span className='text-xl font-black'>Details</span>
              <div className='text-base'>Limit: {JSON.stringify(venues[currentVenue]) !== "{}" ? venues[currentVenue]['limit'] : null}</div>
              <div className='text-base'>Price: P{JSON.stringify(venues) !== "{}" ? venues[currentVenue]['price'] : null}.00</div>
>>>>>>> 0f7aa259078b4966cfc587d3f22bc4838b4dad35
            </div>
            <div className='flex flex-row justify-between'>
                <PrimaryButton onClick={() => {decreaseStep()}}>Back</PrimaryButton>
                <PrimaryButton type='submit'>Next</PrimaryButton>
            </div>
          </div>
      </motion.form>
    </AnimatePresence>
  )
}

export default VenueBookingForm