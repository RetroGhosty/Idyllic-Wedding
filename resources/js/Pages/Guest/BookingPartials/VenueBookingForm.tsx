import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, CircularProgress, CloseButton, Select, filter, useDisclosure } from '@chakra-ui/react'
import { router, useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { add, addDays, addMonths, addWeeks, endOfWeek, format, parse, startOfWeek, subDays } from 'date-fns'
import DatePicker from "react-datepicker";
import "../../../../css/react-datepicker.css"
import { FaArrowLeft, FaCity, FaUsers } from "react-icons/fa";
import { ClearProgressReload, CreateProgressReload } from './FormHelper/ProgressHelper'
import TermsAndConditions from './FormHelper/TermsAndConditions'
import TextInput from '@/Components/TextInput'
import { MdArrowDropDown } from 'react-icons/md'
import { backendUrl } from '@/Helper/Backendhelper'




const VenueBookingForm = ({venues, increaseStep, decreaseStep, transactions, session, place_categories, theme_categories}:any) => {
    const {data, setData, errors, setError, clearErrors} = useForm<any>({
        user_id: session ? session['id'] : undefined,
        venue_id: 0,
        dateSelected: null,
    })
    const datePickingRef = React.useRef<any>(null)
    const [reloadState, setReloadState] = React.useState(false)
    const changeExcludedDates = () => {
      transactions.map((transaction: any) => {
        if (venues.length === 0){
          return false
        }

        if (transaction['venue_id'] === currentVenue['id']){
          const startDate = parse(transaction['start_date'], 'yyyy-MM-dd', new Date())
          const endDate = parse(transaction['end_date'], 'yyyy-MM-dd', new Date())
          excludedDates.push({start: startDate, end: endDate})
        }
      })
    }
    const excludedDates: any[] = []
    const [currentVenue, setCurrentVenue] = React.useState<any>({})
    const [agree, setAgree] = React.useState(false)


    const [currentPlaceCategorySelected, setCurrentPlaceCategorySelected] = React.useState<any>("")
    const [currentThemeCategorySelected, setCurrentThemeCategorySelected] = React.useState<any>("")

    const [filteredVenue, setFilteredVenue] = React.useState(venues)
    const [searchText, setSearchText] = React.useState('')

    const handleSearchChange = (searchType: string, searchValue: any) => {
      let combinedFilter: any[] = [];
    
      if (searchType === "textInput") {
        setSearchText(searchValue);
    
        combinedFilter = venues.filter((venue: any) => {
          return venue['venue_name'].toLowerCase().includes(searchValue.toLowerCase());
        });
      } else if (searchType === "selectInputTheme") {
        combinedFilter = venues.filter((venue: any) => {
          return venue['theme_name'].toLowerCase().includes(searchValue.toLowerCase());
        });
      } else if (searchType === "selectInputPlace") {
        combinedFilter = venues.filter((venue: any) => {
          return venue['place_name'].toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      setFilteredVenue(combinedFilter);
    };

    ////////////////////////////////////////
    const handleVenueChange = (_venue: any) => {
      setData(data => ({...data, 'venue_id': _venue['id']}))
      setData(data => ({...data, 'dateSelected': null}))
      setCurrentVenue(_venue)
      changeExcludedDates()
      datePickingRef.current.scrollIntoView()
    }
    ////////////////////////////////////////
    const dateChange = (date: any) => {
      setData('dateSelected', date)
    }
    changeExcludedDates()
    const handleSubmit = (e: any) => {
      e.preventDefault()
      const payload = {
        'user_id': session['id'],
        'venue_id': currentVenue['id'] || venues[0]['id'],
        'start_date': format(startOfWeek(data['dateSelected']), 'yyyy-MM-dd'),
        'end_date': format(endOfWeek(data['dateSelected']), 'yyyy-MM-dd'),

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
    const { isOpen: isTermOpen, onOpen: onTermOpen, onClose: onTermClose } = useDisclosure()
    
    React.useEffect(() => {
      if (errors['api_status'] !== undefined){
        onOpen()
      }

      
    }, [errors])
  
    const returnBookingTimeline = () => {
      if (data['dateSelected'] === null){
        return "Select a date first"
      }
      const startDate = format(startOfWeek(data['dateSelected']), 'MMMM dd, yyyy')
      const endDate =  format(endOfWeek(data['dateSelected']), 'MMMM dd, yyyy')
      return `${startDate} - ${endDate}`
    }
    
    const checkboxHandler = (e: any) => {
      console.log(agree)
      setAgree(!agree);
    }
    const imageVariant = {
      hidden: {scale: 1.3},
      hover: {scale: 1.08, transition:{duration: 1.5, type: "spring", bounce: 0}},
    }
    const itemVariants = {
      hidden: { opacity: 0, bottom: "-100%" },
      hover: { opacity: 1, bottom: 0,
          transition: {
              duration: 0.3,
          } },
    }

  let categoryFilteredVenue = filteredVenue?.filter((e) => e.theme_name.includes(currentPlaceCategorySelected)).filter((e) => e.place_name.includes(currentThemeCategorySelected))


  return (
    <AnimatePresence>  
      <form onSubmit={handleSubmit} className='flex flex-col space-y-7 my-4'
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
          <div className='relative bg-slate-300'>
            <div className='absolute top-[-25px] w-full grid grid-cols-10 gap-x-5'>
              <TextInput style={{backgroundColor: "#e5e5e5", border: "1px solid #6c757d"}} onChange={(e) => handleSearchChange('textInput', e.target.value)} className='col-span-6' placeholder='Search venue'/>
              <div className='w-full col-span-2'>
                <Select onChange={(e) => setCurrentPlaceCategorySelected(e.target.value)} icon={<MdArrowDropDown />} placeholder='Choose theme' style={{backgroundColor: "#e5e5e5", border: "1px solid #6c757d"}}>
                  {theme_categories.map((eachTheme: any, index: number) => (
                    <option key={index} value={eachTheme['_name']}>{eachTheme['name']}</option>
                  ))}
                </Select>
              </div>
              <div className='w-full col-span-2'>
                <Select onChange={(e) => setCurrentThemeCategorySelected(e.target.value)} icon={<MdArrowDropDown />} placeholder='Choose place' style={{backgroundColor: "#e5e5e5", border: "1px solid #6c757d"}}>
                  {place_categories.map((eachPlace: any, index: number) => (
                    <option key={index} value={eachPlace['name']}>{eachPlace['name']}</option>
                  ))}
                </Select>
              </div>
              
            </div>
            {errors.venue_id ? errors.venue_id : null}
            <div className='grid grid-cols-2 p-6'>
                {categoryFilteredVenue
                .map((venue: any, index: number) => (
                  <>
                    {categoryFilteredVenue.length === 0 ? "lmao" : null}
                    <div key={venue['id']} className="relative h-[300px] w-full overflow-hidden">
                      <motion.div onClick={() => {handleVenueChange(venue)}} whileHover="hover" initial="hidden" className={`bg-slate-200 m-4 h-full relative overflow-hidden ${currentVenue['id'] === venue['id'] ? "border-[4px] border-b-[18px] border-[#ee5858]" : null}`}>
                          <motion.img variants={imageVariant} className="object-cover object-bottom w-full h-full absolute top-0 -z-1" src={`${backendUrl}/storage/${venue['photo_url']}`}/>
                          <div className='absolute z-10 top-0 px-8 py-3 bg-white rounded-br-[20px] shadow-xl'>
                            <h1 className='tracking-widest font-black text-lg'>{venue['venue_name']}</h1>

                          </div>
                          <div className='absolute z-10 bottom-[20px] right-0 flex flex-row m-2 space-x-1 text-[1.05rem]'>
                              <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-out text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                  <span>{`₱ ${venue['price']}.00`}</span>
                              </div>
                              <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-out text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                  <FaUsers/>
                                  <span>{`${venue['limit']}`}</span>
                              </div>
                              <div className='bg-[#332e2a] hover:bg-[#5e4d3e] transition ease-in-outs text-white p-2 rounded-2xl flex flex-row items-center space-x-2 shadow-md'>
                                  <FaCity/>
                                  <span>{venue['place_name']}</span>
                              </div>
                          </div>
                      </motion.div>
                    </div>
                  </>
          
                ))}
            </div>              
          </div>
          <div ref={datePickingRef} className='flex flex-col space-y-4'>
            <div>
              <InputLabel htmlFor="datePicker" value='Choose booking week'/> 
              <span className='text-xl font-black'>
                  <DatePicker 
                  id='datePicker'
                  onChange={dateChange}
                  minDate={startOfWeek(addWeeks(new Date(), 2))}
                  maxDate={endOfWeek(addMonths(new Date(), 3))}
                  wrapperClassName='w-full'
                  className='w-full rounded text-center'
                  excludeDateIntervals={excludedDates}
                  selected={data['dateSelected']}
                  placeholderText="Select a date"
                  dateFormat="I/R"
                  showWeekPicker
                  showWeekNumbers
                  withPortal
                  />
              </span>
            </div>
            {errors.dateSelected ? errors.dateSelected : null}
            <div className='shadow-lg p-6 bg-white'>
              {venues.length !== 0 ? 
              <div className='relative'>
                                <div>
                  <span className='text-2xl font-black'>Booking details</span>
                  <div className='grid grid-cols-2 grid-rows-1 gap-x-12 items-start mb-4'>
                    <div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Venue name</span>
                        <span className='tracking-wider'>{Object.keys(currentVenue).length > 0 ? currentVenue['venue_name'] : null}</span>
                      </div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Limit</span>
                        <span className='tracking-wider'>{Object.keys(currentVenue).length > 0 ? currentVenue['limit'] : null}</span>
                      </div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Total Price</span>
                        <span className='tracking-wider'>₱{Object.keys(currentVenue).length > 0 ? currentVenue['price'] : null}.00</span>
                      </div>
                    </div>
                    <div>
                      <div className='text-lg w-full flex flex-col justify-between'>
                          <span className='text-slate-600'>Reserving venue for</span>
                          <span className=' border-s-4 border-[#e56b6f] ps-2'>
                            {
                              `${returnBookingTimeline()}`
                            }
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className='text-2xl font-black'>Customer details</span>
                  <div className='grid grid-cols-2 grid-rows-1 gap-x-12 items-start mb-4'>
                    <div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>First name</span>
                        <span className='tracking-wider'>{session['first_name']}</span>
                      </div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Last name</span>
                        <span className='tracking-wider'>{session['last_name']}</span>
                      </div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Email</span>
                        <span className='tracking-wider'>{session['email']}</span>
                      </div>
                      <div className='text-lg w-full flex flex-row justify-between'>
                        <span className='text-slate-600'>Contact #</span>
                        <span className='tracking-wider'>{`+63 ${session['phone_number']}`}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              : 
              <>
                <span className='text-xl font-black'>No venue</span>
              </>
              }
            </div>
            <div className='flex flex-row justify-end items-center space-x-4'>
                  <Checkbox type="checkbox" id="agree" onChange={checkboxHandler}/>
                  <div>
                    <label htmlFor='agree' className='text-slate-600 select-none'>{`I agree to the `}</label>
                    <span onClick={onTermOpen} className='text-blue-700 hover:underline cursor-help'>terms and conditions</span>
                  </div>
    
            </div>
            <div className='flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:items-center'>
                <div className='flex flex-row space-x-4 text-red-700 font-black hover:scale-105 transition ease-in-out select-none' onClick={() => {decreaseStep()}}>
                  <FaArrowLeft className="text-xl"/>
                  <span>Return to step 2</span>
                </div>
                
                <div className='flex md:flex-row space-x-4 items-center'>
                  <PrimaryButton type='submit' disabled={reloadState || !agree ? true : false} className='md:order-last md:ms-3'>Next</PrimaryButton>
                  {reloadState ? <CircularProgress isIndeterminate color='blue.700' size="20px"/> : null}
                </div>
            </div>
          </div>
      </form>
      <TermsAndConditions isTermOpen={isTermOpen} onTermClose={onTermClose} />
    </AnimatePresence>
  )
}

export default VenueBookingForm