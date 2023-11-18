import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'
import React from 'react'
import { ClearProgressReload, CreateProgressReload } from './FormHelper/ProgressHelper'
import { CircularProgress } from '@chakra-ui/react'


const ContactInfoForm = ({venues, increaseStep, decreaseStep, session}: any) => {

    const {data, setData, errors, setError, post, } = useForm<any>({
        email: session ? session['email'] : "",
        phone_number: session ? session['phone_number'] : "",
        first_name: session ? session['first_name'] : "",
        last_name: session ? session['last_name'] : "",
    })

    const [reloadState, setReloadState] = React.useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (session['id'] === undefined){
            router.post(route('booking.contactinfo'), data, {
                preserveScroll: true,
                onSuccess: () => increaseStep(),
                onError: (errors: any) => {
                    setError(errors)
                }
            })
        } else{
            router.patch(route("booking.contactInfoUpdate", session['id']), data, {
                preserveScroll: true,
                onSuccess: () => increaseStep(),
                onError: (errors: any) => {
                    setError(errors)
                },
                onStart: () => {CreateProgressReload(setReloadState)},
                onFinish: () => {ClearProgressReload(setReloadState)}
            })
        }
    } 

  return (
    <AnimatePresence>
        <motion.form onSubmit={handleSubmit} className='flex flex-col space-y-7 my-4'
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        >
            <div className='font-black text-2xl'>Contact Info</div>
            <div className='flex flex-col'>
                <InputLabel htmlFor="email" value='Email'/> 
                <TextInput autoComplete="off"  id='email' type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email ? errors.email : null}
            </div>               
            <div className='flex flex-col'>
                <InputLabel htmlFor="phone_number" value='Phone Number'/> 
                <TextInput autoComplete="off"  id='phone_number' type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                {errors.phone_number ? errors.phone_number : null}
            </div>       
            <div className='flex flex-col'>
                <InputLabel htmlFor="first_name" value='First Name'/> 
                <TextInput autoComplete="off"  id='first_name' type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                {errors.first_name ? errors.first_name : null}
            </div>       
            <div className='flex flex-col'>
                <InputLabel htmlFor="last_name" value='Last Name'/> 
                <TextInput autoComplete="off"  id='last_name' type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                {errors.last_name ? errors.last_name : null}
            </div>       
            <div className='flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:items-center'>
                <div className='flex flex-row space-x-4 text-red-700 font-black hover:scale-105 transition ease-in-out select-none' onClick={() => {decreaseStep()}}>
                  <FaArrowLeft className="text-xl"/>
                  <span>Return to step 1</span>
                </div>
                <div className='flex md:flex-row space-x-4 items-center'>
                  <PrimaryButton type='submit' disabled={reloadState ? true : false} className='md:order-last md:ms-3'>Next</PrimaryButton>
                  {reloadState ? <CircularProgress isIndeterminate color='blue.700' size="20px"/> : null}
                </div>
            </div>
        </motion.form>
    </AnimatePresence>
  )
}

export default ContactInfoForm