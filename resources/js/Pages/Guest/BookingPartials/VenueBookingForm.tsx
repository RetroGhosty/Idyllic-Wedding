import InputLabel from '@/Components/InputLabel'
import { Select } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const VenueBookingForm = ({venues}:any) => {
    const {data, setData, errors} = useForm<any>({
        venue_id: '',
    })

    const [currentVenue, setCurrentVenue] = React.useState(0)
    const handleVenueChange = (e: any) => {
      setData('venue_id', e.target.value)
      setCurrentVenue(e.target.value)
    }

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
          <div className='flex flex-col'>
            <span className='text-xl font-black'>Details</span>
            <div>
              <div className='text-base'>Limit: {venues[currentVenue]['limit']}</div>
              <div className='text-base'>Price: P{venues[currentVenue]['price']}.00</div>
            </div>
          </div>
      </motion.form>
    </AnimatePresence>
  )
}

export default VenueBookingForm