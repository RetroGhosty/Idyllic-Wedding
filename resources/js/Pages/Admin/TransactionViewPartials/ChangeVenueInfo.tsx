import React from 'react'
import DatePicker from 'react-datepicker'

import "../../../../css/react-datepicker.css"
import { addMonths, addWeeks, endOfWeek, format, parse, startOfWeek } from 'date-fns';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { Select, useToast } from '@chakra-ui/react';
import PrimaryButton from '@/Components/PrimaryButton';

const ChangeVenueInfo = ({users, transaction, allTransaction, allVenue, transactionVenue}:any) => {
  const {data, setData, errors, wasSuccessful, patch, transform} = useForm<any>({
    user_id: transaction['customer_id'],
    venue_id: 0,
    start_date: null,
    end_date: null,
})
  const [dateSelected, setDateSelected] = React.useState<any>(parse(transaction['start_date'], 'yyyy-MM-dd', new Date()))
  const [currentVenue, setCurrentVenue] = React.useState(0)
  const toast = useToast()
  React.useEffect(() => {
    if (wasSuccessful){
        toast({
            title: "Success",
            description: "Customer information updated",
            position: "bottom-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
    }
  }, [wasSuccessful])
  
  const excludedDates: any[] = []
  const changeExcludedDates = () => {
    allTransaction.map((eachTransaction: any) => {
      if (allVenue.length === 0){
        return false
      }

      if (eachTransaction['venue_id'] === allVenue[data.venue_id]['id']){
        const startDate = parse(eachTransaction['start_date'], 'yyyy-MM-dd', new Date())
        const endDate = parse(eachTransaction['end_date'], 'yyyy-MM-dd', new Date())
        excludedDates.push({start: startDate, end: endDate})
      }
    })
  }
  const handleVenueChange = (e: any) => {
    setData(data => ({...data, venue_id: e.target.value}))
    setData(data => ({...data, start_date: null}))
    setData(data => ({...data, end_date: null}))
    setCurrentVenue(e.target.value)
    changeExcludedDates()
  }
  changeExcludedDates()
  const dateChange = (date: any) => {
    setData(data => ({...data, start_date: startOfWeek(date)}))
    setData(data => ({...data, end_date: endOfWeek(date)}))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    transform((data) => ({
      ...data,
      venue_id: allVenue[data['venue_id']]['id'],
      start_date: format(data['start_date'], 'yyyy-MM-dd'),
      end_date: format(data['end_date'], 'yyyy-MM-dd'),
    }))
    patch(route('admin.transaction.editVenueTransactionDetails', transaction['id']))
  }
  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
            <InputLabel htmlFor="venue_id" value='Venue'/> 
            <Select autoComplete="off" id='venue_id' value={data.venue_id} onChange={handleVenueChange}>
                {allVenue.map((venue: any, index: number) => (
                  <option key={index} value={index}>{venue['venue_name']}</option>
                  ))}
            </Select>
            {errors.venue_id ? errors.venue_id : null}
        </div>
        <div>
          <InputLabel htmlFor="datePicker" value='Choose date'/>
          <DatePicker 
          id='datePicker'
          onChange={dateChange}
          minDate={addWeeks(new Date(), 2)}
          maxDate={addMonths(new Date(), 3)}
          wrapperClassName='w-full bg-transparent'
          className='w-full rounded text-center bg-transparent'
          excludeDateIntervals={excludedDates}
          selected={data['start_date']}
          placeholderText="Select a date"
          dateFormat="I/R"
          showWeekPicker
          showWeekNumbers
          withPortal
          />
        </div>
        <div>
          <PrimaryButton type='submit'>Edit</PrimaryButton>
        </div>
      </div>
    </form>
  )
}

export default ChangeVenueInfo