import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import { Select } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { add, addDays, addMonths, format } from 'date-fns'
import DatePicker from "react-datepicker";
import "../../../../css/react-datepicker.css"
import { parse } from 'date-fns'

const VenueBookingForm = ({venues, increaseStep, decreaseStep, reservations}:any) => {
    const {data, setData, errors} = useForm<any>({
        venue_id: 0,
        dateSelected: addDays(new Date(), 4),
    })
    const changeExcludedDates = () => {
      if (reservations['venue_id'] !== undefined && venues !== null){
        debugger;
        reservations.map((reservation: any) => {
          if (reservation['venue_id'] === venues[data.venue_id]['id']){
            excludedDates.push(parse(reservation['event_date'], 'yyyy-MM-dd', new Date()))
          }
        })
      }
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

    



  return (
    <AnimatePresence>
      <motion.form className='flex flex-col space-y-7'
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      >
          <div className='font-black text-2xl'>Venue Booking</div>
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
                  onChange={dateChange}
                  minDate={addDays(new Date(), 3)}
                  maxDate={addMonths(new Date(), 3)}
                  excludeDates={excludedDates}
                  selected={data['dateSelected']}
                  />
              </span>
            </div>
            <div>
              <span className='text-xl font-black'>Details</span>
              <div className='text-base'>Limit: {JSON.stringify(venues[currentVenue]) !== "{}" ? venues[currentVenue]['limit'] : null}</div>
              <div className='text-base'>Price: P{JSON.stringify(venues) !== "{}" ? venues[currentVenue]['price'] : null}.00</div>
            </div>
            <div className='flex flex-row justify-between'>
                <PrimaryButton onClick={() => {decreaseStep()}}>Back</PrimaryButton>
                <PrimaryButton onClick={() => {increaseStep()}}>Next</PrimaryButton>
            </div>
          </div>
      </motion.form>
    </AnimatePresence>
  )
}

export default VenueBookingForm